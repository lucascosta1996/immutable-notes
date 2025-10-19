'use client';

import React, { useCallback } from 'react';
import { ColorPickerSwatch } from './ColorPickerSwatch';
import { useColor } from '@/hooks/useColor';

const colors: string[] = ['#af84b4', '#ccaec9', '#dad5e7', '#ddf4e3', '#b5ffb6'];

export const ColorPicker = React.memo(function ColorPicker() {
    const { color: selectedColor, setColor } = useColor();

  // Keep the latest onColorSelect without changing onSelect identity
  const latestOnSelectRef = React.useRef(setColor);
  React.useEffect(() => {
    latestOnSelectRef.current = setColor;
  }, [setColor]);

  const handleColorClick = useCallback((color: string) => {
    setColor(color);                 // update the external store
    latestOnSelectRef.current?.(color);      // optional side-effect for parents
  }, [setColor]);

  return (
    <section id="color-picker" className="flex flex-col justify-items-between gap-2">
      {colors.map((color) => (
        <ColorPickerSwatch
          key={color}
          color={color}
          selected={selectedColor === color}
          onSelect={handleColorClick}
        />
      ))}
    </section>
  );
});
