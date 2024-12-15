export function getLocaleFromURL(url: string): string | null {
  const parsedUrl = new URL(url);
  const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
  
  if (pathSegments.length > 0) {
    return pathSegments[0];
  }
  
  return null;
}
