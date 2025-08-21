// @ts-nocheck
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type Props = {
  image: string;
  varientmedia: { type: 'image'|'video'|'gif'; url: string }[];
  mediaState: { currentMediaUrl?: string; currentMediaType?: 'image'|'video'|'gif' };
  onChangeImage: (url: string) => void;
  onMediaStateChange: (patch: Partial<{ currentMediaUrl?: string; currentMediaType?: 'image'|'video'|'gif' }>) => void;
  dnd: { dragged: any; over: any; onDragStart: any; onDragOver: any; onDragEnd: any };
  isUploading: boolean;
  uploadError?: string;
  onUploadFiles: (files: FileList) => void;
  onAddMediaFromUrl: () => void;
};

const MediaSection: React.FC<Props> = ({ image, varientmedia, mediaState, onChangeImage, onMediaStateChange, dnd, isUploading, uploadError, onUploadFiles, onAddMediaFromUrl }) => {
  return (
    <div className="space-y-3">
      <Label>Add Media (Image, Video, GIF)</Label>
      <div className="mb-2">
        <Label>Main Image (for this variant)</Label>
        <div className="flex items-center gap-2">
          {image ? (
            <img src={image} alt="main" className="w-12 h-12 object-cover rounded border" />
          ) : (
            <span className="w-12 h-12 flex items-center justify-center border rounded bg-gray-50 text-gray-400">No Image</span>
          )}
          <Input style={{ maxWidth: 220 }} value={image || ''} onChange={(e) => onChangeImage(e.target.value)} placeholder="Paste image URL" />
          {image && (
            <Button type="button" size="icon" variant="destructive" onClick={() => onChangeImage('')}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <Input
          value={mediaState?.currentMediaUrl || ''}
          onChange={(e) => onMediaStateChange({ currentMediaUrl: e.target.value })}
          onKeyPress={(e) => { if (e.key === 'Enter') onAddMediaFromUrl(); }}
          placeholder="Enter media URL"
        />
        <select
          value={mediaState?.currentMediaType || 'image'}
          onChange={(e) => onMediaStateChange({ currentMediaType: e.target.value as any })}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="gif">GIF</option>
        </select>
        <Button type="button" size="sm" onClick={onAddMediaFromUrl}>Add</Button>

        <input
          type="file"
          multiple
          accept="image/*,video/*,.gif"
          style={{ display: 'none' }}
          id={`combo-media-upload`}
          onChange={(e) => e.target.files && onUploadFiles(e.target.files)}
        />
        <label htmlFor={`combo-media-upload`}>
          <Button type="button" size="sm" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </label>
      </div>
      {uploadError && (
        <p className="text-red-500 text-sm mt-1">{uploadError}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {varientmedia.map((media, mediaIndex) => (
          <div
            key={mediaIndex}
            className={`relative group flex flex-col items-center${dnd.dragged && dnd.dragged.index === mediaIndex ? ' opacity-50' : ''}${dnd.over && dnd.over.index === mediaIndex ? ' ring-2 ring-blue-400' : ''}`}
            draggable
            onDragStart={() => dnd.onDragStart(0, mediaIndex)}
            onDragOver={(e) => { e.preventDefault(); dnd.onDragOver(0, mediaIndex); }}
            onDragEnd={dnd.onDragEnd}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSection;


