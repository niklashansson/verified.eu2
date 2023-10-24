/**
 *
 * @param string
 */

export function formatResourceDate(string: string) {
  const date = new Date(string);
  if (!date) return;
  return date.toLocaleDateString();
}
