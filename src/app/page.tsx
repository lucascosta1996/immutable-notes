'use client';
import React, { useState } from "react";
import ColorPicker from "@/components/ColorPicker/ColorPicker";
import NftSvgPreview from "@/components/NFTPreview/NFTPreview";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<string | null>('#af84b4');

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className="flex gap-4 items-center align-middle flex-col sm:flex-row h-auto sm:h-auto">
          <NftSvgPreview backgroundColor={selectedColor} />
          <ColorPicker onColorSelect={setSelectedColor} />
        </div>
      </main>
    </div>
  );
}
