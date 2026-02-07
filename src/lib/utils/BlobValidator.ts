export class BlobValidator {
  public static isValidImage(src: string): Promise<boolean> {
    return new Promise(resolve => {
      try {
        const img = new Image(),
          cleanup = () => img.parentNode && img.parentNode.removeChild(img);
        img.onload = () => {
          cleanup();
          resolve(true);
        };
        img.onerror = () => {
          cleanup();
          resolve(false);
        };
        img.decoding = "async";
        img.src = src;
        img.style.position = "absolute";
        img.style.visibility = "hidden";
        img.style.pointerEvents = "none";
        img.style.width = "1px";
        img.style.height = "1px";
        document.body.appendChild(img);
      } catch (error) {
        console.warn("Exception occurred while loading image:", src, error);
        resolve(false);
      }
    });
  }

  public static async testImagePath(
    basePath: string,
    extensions: string[] = ["png", "webp", "jpeg", "jpg"],
  ): Promise<string | null> {
    for (const ext of extensions) {
      const fullPath = `${basePath}.${ext}`;
      if (await this.isValidImage(fullPath)) return fullPath;
    }
    console.warn("No valid image found at path:", basePath);
    return null;
  }
}
