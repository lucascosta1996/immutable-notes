'use client';

import { useState, useRef, useEffect } from 'react';
import { measureSegments } from '@/utils/measureSegments';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { containsSensitiveInfo } from '@/utils/containSensitiveInformation';
import Alert from '../Alert/Alert';
import { Clock } from '../Clock/Clock';
import { useColor } from '@/hooks/useColor';

const MAX_LINES = 13;

type Props = {
  initialText?: string;
  backgroundColor?: string | null;
  borderRadius?: number;
  textColor?: string;
};

export default function NftSvgEditor({
  initialText = '',
  textColor = '#000000',
}: Props) {
  const [value, setValue] = useState(initialText);
  const [to, setTo] = useState<string | null>(null);
  const [segments, setSegments] = useState<string[]>([]);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { color: backgroundColor } = useColor();

  useEffect(() => {
    const segs = measureSegments(initialText);
    setSegments(segs);
  }, [initialText]);

  useEffect(() => {
    if (alert) {
      setAlert(null);
    }
  }, [value]);

  const handleTextChange = (text: string) => {
    const segs = measureSegments(text);
    if (segs.length <= MAX_LINES) {
      setValue(text);
      setSegments(segs);
    }
  };

  const handleSvgClick = () => {
    textareaRef.current?.focus();
  };

  const handleSubmit = async () => {
    const sensitive = containsSensitiveInfo(value);
    if (sensitive) {
      setAlert({ message: `Your message contains a ${sensitive}. Please remove it before continuing.`,
        type: 'error' });
      return;
    }

    const res = await fetch('/api/moderate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: value }),
    });

    const data: { ok: boolean; flagged?: boolean; error?: string } = await res.json();

    if (!data.ok) {
      setAlert({ message: data.error || 'An error occurred during moderation.', type: 'error' });
      return;
    }

    // Continue to mint or next step
    console.log('Message is clean — proceeding.');
  };


  return (
    <div className="relative w-[320px] h-[360px] mx-auto">
      {/* SVG Layer */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="320"
        height="360"
        className="absolute left-0 top-0 z-0 cursor-text"

      >
        {/* Background */}
        <rect
          width="300"
          height="300"
          fill={backgroundColor ?? undefined}
          x="10"
          y="30"
        />

        {/* Border outline */}
        <rect
          x="1"
          y="1"
          width="318"
          height="358"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
        />
        <text
          x="10"
          y="22"
          fontSize="18px"
          fill={textColor}
          fontFamily="Arial,sans-serif"
        >
          <tspan x="10" dy="0" fontWeight="bold">To: {to}</tspan>
        </text>

        <text
          x="20"
          y={60}
          fontSize="18px"
          fill={textColor}
          fontFamily="Arial,sans-serif"
          onClick={handleSvgClick}
        >
          {segments.map((segment, i) => (
            <tspan
              key={i}
              x="20"
              dy={i === 0 ? '0' : '1.2em'}
              fontSize="18px"
            >
              {segment}
            </tspan>
          ))}
          {value == "" && (
            <tspan x="20" dy="0" fontSize="18px" fill="#5c5c5c">
              Type Your Message Here...
            </tspan>
          )}
        </text>
        <text
          x="10"
          y="332"
          fontSize="14px"
          fill={textColor}
          fontFamily="Arial,sans-serif"
        >
          <Clock />
        </text>
      </svg>

      {/* Transparent Textarea Overlay */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => handleTextChange(e.target.value)}
        className="absolute z-10 h-[300px] w-[300px] resize-none bg-transparent text-transparent caret-black dark:caret-black focus:outline-none"
        style={{
          left: "10px",
          top: "30px",
          fontSize: "18px",
          padding: "10px",
          fontFamily: "Arial,sans-serif",
          lineHeight: "22px"
        }}
        rows={MAX_LINES}
        aria-label="NFT Text Input"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        id="nft-text-input"
      />
      <input
        value={to || ''}
        onChange={(e) => setTo(capitalizeFirstLetter(e.target.value))}
        className="absolute z-10 h-[30px] w-[300px] bg-transparent text-transparent caret-black dark:caret-black focus:outline-none font-bold"
        style={{
          left: "30px",
          top: "0px",
          fontSize: "18px",
          padding: "10px",
          fontFamily: "Arial,sans-serif",
        }}
        aria-label="NFT To Address Input"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        id="nft-to-input"
      />
      <button
        onClick={handleSubmit}
        disabled={value === ""}
        className="absolute -bottom-12 left-0 px-4 py-2 bg-black w-full cursor-pointer text-white rounded hover:bg-gray-800 focus:outline-none"
      >
        Submit Note
      </button>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          position="bottom-right"
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}
