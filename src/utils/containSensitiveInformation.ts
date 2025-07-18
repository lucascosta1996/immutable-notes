export function containsSensitiveInfo(text: string): string | null {
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const phoneRegex = /\b(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,5}[-.\s]?\d{4}\b/;
  const cardRegex = /\b(?:\d[ -]*?){13,16}\b/;
  const passwordRegex = /(?:password|passwd|pass)\s*[:=]\s*\S+/i;

  if (emailRegex.test(text)) return "email address";
  if (phoneRegex.test(text)) return "phone number";
  if (cardRegex.test(text)) return "credit card number";
  if (passwordRegex.test(text)) return "password";

  return null;
}
