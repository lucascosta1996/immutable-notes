let color = '#af84b4';
const listeners = new Set<() => void>();

export function setColor(next: string) {
  if (next === color) return;
  color = next;
  listeners.forEach(l => l());
}

export function getSnapshot() { return color; }
export function getServerSnapshot() { return '#af84b4'; }
export function subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); }
