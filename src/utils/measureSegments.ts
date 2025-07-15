export function measureSegments(text: string): string[] {
  if (typeof window === 'undefined') return [];

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return [];

  context.font = '18px Arial, sans-serif';
  const maxWidth = 280;

  const lines = text.split('\n');
  const result: string[] = [];

  const measure = (str: string) => context.measureText(str).width;

  const splitByWidth = (line: string) => {
    let start = 0;
    while (start < line.length) {
      let low = start;
      let high = line.length;

      while (low < high) {
        const mid = Math.floor((low + high + 1) / 2);
        const slice = line.slice(start, mid);
        if (measure(slice) <= maxWidth) {
          low = mid;
        } else {
          high = mid - 1;
        }
      }

      const segment = line.slice(start, low);
      result.push(segment || '\u00A0');
      start = low;
    }
  };

  for (const line of lines) {
    if (line === '') {
      result.push('\u00A0');
    } else {
      splitByWidth(line);
    }
  }

  return result;
};