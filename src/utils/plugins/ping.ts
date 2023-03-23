export function ping(
  url: string,
  cache: boolean = true,
  timeout: number = 1000
) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = `${url}?time=${cache ? 0 : new Date().valueOf()}`;
    img.onload = () => {
      resolve();
    };
    img.onerror = () => {
      reject();
    };
  });
}
