/**
   * Extracts the locale from a given URL.
   *
   * This function parses the provided URL and retrieves the first segment
   * of the path as the locale. If the URL does not contain any path segments,
   * it returns `null`.
   *
   * @param {string} url - The URL from which to extract the locale.
   * @returns {string | null} The locale extracted from the URL, or `null` if no locale is found.
   */
  export function getLocaleFromURL(url: string): string | null {
    // Parse the URL to extract its components
    const parsedUrl = new URL(url);

    // Split the pathname into segments and filter out empty values
    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);

    // Return the first segment as the locale, or null if no segments exist
    if (pathSegments.length > 0) {
      return pathSegments[0];
    }

    return null;
  }
