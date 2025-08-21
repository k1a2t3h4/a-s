// @ts-nocheck
import { useState } from 'react';

export const useVariantMediaDnD = () => {
  const [dragged, setDragged] = useState<{ combo: number; index: number } | null>(null);
  const [over, setOver] = useState<{ combo: number; index: number } | null>(null);

  const onDragStart = (combo: number, index: number) => setDragged({ combo, index });
  const onDragOver = (combo: number, index: number) => setOver({ combo, index });
  const onDragEnd = () => { setDragged(null); setOver(null); };

  return { dragged, over, onDragStart, onDragOver, onDragEnd };
};


