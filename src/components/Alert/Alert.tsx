'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

type AlertType = 'success' | 'warning' | 'error';
type AlertPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface AlertProps {
  message: string;
  type?: AlertType;
  position?: AlertPosition;
  duration?: number; // in ms
  onClose?: () => void;
}

export default function Alert({
  message,
  type = 'success',
  position = 'top-right',
  duration = 3000,
  onClose,
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setShouldRender(false);
        onClose?.();
      }, 300); // match transition duration
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose?.();
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={clsx(
        'fixed m-4 px-4 py-2 rounded shadow-md text-sm font-medium z-50 flex items-center justify-between min-w-[250px] transition-opacity duration-300',
        {
          'bg-green-600 text-white': type === 'success',
          'bg-yellow-500 text-black': type === 'warning',
          'bg-red-600 text-white': type === 'error',
          'top-4 left-4': position === 'top-left',
          'top-4 right-4': position === 'top-right',
          'bottom-4 left-4': position === 'bottom-left',
          'bottom-4 right-4': position === 'bottom-right',
          'opacity-0': !visible,
          'opacity-100': visible,
        }
      )}
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 font-bold text-lg cursor-pointer leading-none focus:outline-none"
        aria-label="Close Alert"
      >
        ×
      </button>
    </div>
  );
}
