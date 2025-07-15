'use client';

import { useState } from 'react';

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
}

const colors: string[] = ['#af84b4', '#ccaec9', '#dad5e7', '#ddf4e3', '#b5ffb6'];

export default function ColorPicker({ onColorSelect }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>('#af84b4');

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  return (
    <section id="color-picker" className="flex flex-col justify-items-between gap-2">
      {colors.map((color) => (
        <div
          key={color}
          className={`flex items-center border-2 border-solid border-black w-full sm:w-[65px] sm:h-[65px] cursor-pointer ${
            selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        />
      ))}
    </section>
  );
}
