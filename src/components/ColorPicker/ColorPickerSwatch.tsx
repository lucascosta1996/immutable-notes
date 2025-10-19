import React from 'react';

interface SwatchProps {
  color: string;
  selected: boolean;
  onSelect: (color: string) => void;
}

export const ColorPickerSwatch = React.memo(function Swatch({ color, selected, onSelect }: SwatchProps) {
  // No closure per item: handler is stable and only carries `color`
  const onClick = React.useCallback(() => onSelect(color), [onSelect, color]);

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      className={`flex items-center border-2 border-solid border-black w-full sm:w-[65px] sm:h-[65px] cursor-pointer ${
        selected ? 'ring-2 ring-offset-2 ring-black' : ''
      }`}
      // Avoid passing a style object from the parent; create it here so this child
      // only re-renders when its own props change.
      style={{ backgroundColor: color }}
      aria-label={`Choose color ${color}`}
    />
  );
});