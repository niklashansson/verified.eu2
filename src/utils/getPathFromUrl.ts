/**
 * Extract the path from a URL
 * @param {string} urlString
 * @returns {string | undefined} Returns the path or undefined if the URL is invalid
 */

export function getPathFromUrl(urlString: string) {
  try {
    const url = new URL(urlString);
    return url.pathname;
  } catch (e) {
    console.error('Could not extract path from URL');
    return undefined;
  }
}
