'use client';
import * as React from 'react';
import { subscribe, getSnapshot, getServerSnapshot, setColor as set } from '@/lib/color-store';

export function useColor() {
  const color = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setColor = React.useCallback((c: string) => set(c), []);
  return { color, setColor };
}
