import React, { useState } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

export const ProductGlobalMediaInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const media = productFormData.globalMedia || [];

  const [currentGlobalMediaUrl, setCurrentGlobalMediaUrl] = useState('');
  const [currentGlobalMediaType, setCurrentGlobalMediaType] = useState<'image' | 'video' | 'gif'>('image');
  const [draggedGlobalMediaIndex, setDraggedGlobalMediaIndex] = useState<number | null>(null);
  const [dragOverGlobalMediaIndex, setDragOverGlobalMediaIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleGlobalMediaDragStart = (index: number) => setDraggedGlobalMediaIndex(index);
  const handleGlobalMediaDragOver = (index: number) => setDragOverGlobalMediaIndex(index);
  const handleGlobalMediaDrop = (index: number) => {
    if (draggedGlobalMediaIndex === null) return;
    moveGlobalMedia(draggedGlobalMediaIndex, index);
    setDraggedGlobalMediaIndex(null);
    setDragOverGlobalMediaIndex(null);
  };
  const handleGlobalMediaDragEnd = () => {
    setDraggedGlobalMediaIndex(null);
    setDragOverGlobalMediaIndex(null);
  };

  const moveGlobalMedia = (from: number, to: number) => {
    if (to < 0 || to >= media.length) return;
    const result = Array.from(media);
    const [removed] = result.splice(from, 1);
    result.splice(to, 0, removed);
    setProductFormData((prev: any) => ({ ...prev, globalMedia: result }));
  };

  const removeGlobalMedia = (mediaIndex: number) => {
    setProductFormData((prev: any) => ({
      ...prev,
      globalMedia: (prev.globalMedia || []).filter((_: any, i: number) => i !== mediaIndex)
    }));
  };

  const handleGlobalMediaUpload = (files: FileList) => {
    setIsUploading(true);
    setUploadError('');
    try {
      const newMedia = Array.from(files).map(file => {
        const url = URL.createObjectURL(file);
        const ext = file.name.split('.').pop()?.toLowerCase();
        let type: 'image' | 'video' | 'gif' = 'image';
        if (ext === 'mp4' || ext === 'webm' || ext === 'mov') type = 'video';
        if (ext === 'gif') type = 'gif';
        return { type, url, name: file.name };
      });
      setProductFormData((prev: any) => ({ ...prev, globalMedia: [...(prev.globalMedia || []), ...newMedia] }));
    } catch (error) {
      setUploadError('Failed to upload media files');
      // eslint-disable-next-line no-console
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const validateMediaUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addGlobalMedia = (mediaType: 'image' | 'video' | 'gif') => {
    if (!currentGlobalMediaUrl.trim()) return;
    if (!validateMediaUrl(currentGlobalMediaUrl.trim())) {
      alert('Please enter a valid URL');
      return;
    }
    setProductFormData((prev: any) => ({
      ...prev,
      globalMedia: [...(prev.globalMedia || []), { type: mediaType, url: currentGlobalMediaUrl.trim() }]
    }));
    setCurrentGlobalMediaUrl('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Global Media
          <span className="text-sm text-gray-500">{media.length} media items</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Add Media (Image, Video, GIF)</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={currentGlobalMediaUrl}
              onChange={e => setCurrentGlobalMediaUrl(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  addGlobalMedia(currentGlobalMediaType);
                }
              }}
              placeholder="Enter media URL"
            />
            <select value={currentGlobalMediaType} onChange={e => setCurrentGlobalMediaType(e.target.value as any)}>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="gif">GIF</option>
            </select>
            <Button type="button" size="sm" onClick={() => addGlobalMedia(currentGlobalMediaType)}>Add</Button>
            <input type="file" multiple accept="image/*,video/*,.gif" style={{ display: 'none' }} id="global-media-upload" onChange={e => e.target.files && handleGlobalMediaUpload(e.target.files)} />
            <label htmlFor="global-media-upload">
              <Button type="button" size="sm" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </label>
          </div>
          {uploadError && (
            <p className="text-red-500 text-sm mt-1">{uploadError}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {media.map((media: any, i: number) => (
              <div
                key={i}
                className={`relative group flex flex-col items-center${draggedGlobalMediaIndex === i ? ' opacity-50' : ''}${dragOverGlobalMediaIndex === i ? ' ring-2 ring-blue-400' : ''}`}
                draggable
                onDragStart={() => handleGlobalMediaDragStart(i)}
                onDragOver={e => { e.preventDefault(); handleGlobalMediaDragOver(i); }}
                onDrop={() => handleGlobalMediaDrop(i)}
                onDragEnd={handleGlobalMediaDragEnd}
                style={{ cursor: 'grab' }}
              >
                <div className="flex items-center gap-1">
                  <span className="cursor-grab text-gray-400">&#9776;</span>
                  {media.type === 'image' || media.type === 'gif' ? (
                    <img src={media.url} alt={media.type} className="w-12 h-12 object-cover rounded border" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-xs">Video</div>
                  )}
                </div>
                <div className="flex gap-1 mt-1">
                  <Button type="button" size="icon" variant="ghost" onClick={() => moveGlobalMedia(i, i - 1)} disabled={i === 0}>
                    &#8592;
                  </Button>
                  <Button type="button" size="icon" variant="ghost" onClick={() => moveGlobalMedia(i, i + 1)} disabled={i === media.length - 1}>
                    &#8594;
                  </Button>
                  <Button type="button" size="sm" variant="destructive" onClick={() => removeGlobalMedia(i)}>
                    <X className="h-2 w-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 