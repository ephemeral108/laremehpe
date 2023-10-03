/**
 * This function sends a GET request to the specified URL by creating an image object with the URL as its source.
 * It returns a Promise that resolves if the image loads successfully and rejects if it fails to load within the specified timeout.
 * The cache parameter can be set to false to bypass the cache and force a new request to be made.
 * The timeout parameter specifies the maximum time in milliseconds to wait for the image to load before rejecting the Promise.
 * @param url The URL to send the GET request to
 * @param cache Whether or not to bypass the cache
 * @param timeout The maximum time in milliseconds to wait for the image to load
 * @returns A Promise that resolves if the image loads successfully and rejects if it fails to load within the specified timeout
 */
export function ping(
  url: string,
  cache: boolean = true,
  timeout: number = 1000
) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    // Set the source of the image object to the specified URL with a timestamp parameter to bypass the cache if necessary
    img.src = `${url}?time=${cache ? 0 : new Date().valueOf()}`;
    // Set a timeout to reject the Promise if the image fails to load within the specified time
    setTimeout(() => {
      reject();
    }, timeout);
    // Resolve the Promise if the image loads successfully
    img.onload = () => {
      resolve();
    };
    // Reject the Promise if the image fails to load
    img.onerror = () => {
      reject();
    };
  });
}

