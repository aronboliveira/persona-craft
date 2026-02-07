/**
 * noseImages.test.ts
 *
 * Verifies that every nose form image source resolves to a file
 * that exists on disk (in public/) and that a mock HTMLImageElement
 * does NOT throw onerror when the file is present.
 */
import * as fs from "fs";
import * as path from "path";

const PUBLIC_DIR = path.resolve(__dirname, "../../../public");

/** Simulate an <img> load in jsdom. Returns a promise that resolves
 *  if the image loads successfully, rejects on error.  We patch the
 *  Image prototype to synchronously check the file on disk. */
function loadImage(relativeSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const diskPath = path.join(PUBLIC_DIR, relativeSrc);
    // Follow symlinks
    let realPath: string;
    try {
      realPath = fs.realpathSync(diskPath);
    } catch {
      reject(new Error(`File not found (symlink broken): ${diskPath}`));
      return;
    }
    if (!fs.existsSync(realPath)) {
      reject(new Error(`File does not exist: ${realPath}`));
      return;
    }
    const stat = fs.statSync(realPath);
    if (stat.size === 0) {
      reject(new Error(`File is empty (0 bytes): ${realPath}`));
      return;
    }
    resolve(relativeSrc);
  });
}

describe("Nose form images — file existence", () => {
  describe("NoseShapeForm (order 69)", () => {
    const shapes = [
      "button",
      "celestial",
      "snub",
      "greek",
      "roman",
      "aquiline",
      "hawk",
      "nubian",
      "bulbous",
      "flat",
      "fleshy",
    ];
    it.each(shapes)("%s.png should exist and be non-empty", async shape => {
      await expect(
        loadImage(`/imgs/head/noses/${shape}.png`),
      ).resolves.toBeDefined();
    });
  });

  describe("NoseBridgeWidthForm (order 70)", () => {
    const widths = ["narrow", "average", "wide"];
    it.each(widths)("%s-bridge.png should exist and be non-empty", async w => {
      await expect(
        loadImage(`/imgs/head/noses/${w}-bridge.png`),
      ).resolves.toBeDefined();
    });
  });

  describe("NoseBridgeHeightForm (order 71)", () => {
    const heights = ["short", "average", "tall"];
    it.each(heights)(
      "%s-bridge-h.png should exist and be non-empty",
      async h => {
        await expect(
          loadImage(`/imgs/head/noses/${h}-bridge-h.png`),
        ).resolves.toBeDefined();
      },
    );
  });

  describe("NoseNostrilSizeForm (order 72)", () => {
    const sizes = ["small", "average", "large"];
    it.each(sizes)("%s-nostril.png should exist and be non-empty", async sz => {
      await expect(
        loadImage(`/imgs/head/noses/${sz}-nostril.png`),
      ).resolves.toBeDefined();
    });
  });

  describe("NoseNostrilFlareForm (order 73)", () => {
    const flares = ["minimal", "moderate", "wide"];
    it.each(flares)("%s-flare.png should exist and be non-empty", async fl => {
      await expect(
        loadImage(`/imgs/head/noses/${fl}-flare.png`),
      ).resolves.toBeDefined();
    });
  });

  describe("NoseLengthForm (order 74)", () => {
    const lengths = ["short", "average", "long"];
    it.each(lengths)("%s-length.png should exist and be non-empty", async l => {
      await expect(
        loadImage(`/imgs/head/noses/${l}-length.png`),
      ).resolves.toBeDefined();
    });
  });

  describe("NoseTipAngleForm (order 75)", () => {
    const angles = ["upturned", "neutral", "downturned"];
    it.each(angles)("%s-tip.png should exist and be non-empty", async a => {
      await expect(
        loadImage(`/imgs/head/noses/${a}-tip.png`),
      ).resolves.toBeDefined();
    });
  });
});

describe("Nose form images — mock HTMLImageElement", () => {
  const ALL_NOSE_IMAGES = [
    // shape
    ...[
      "button",
      "celestial",
      "snub",
      "greek",
      "roman",
      "aquiline",
      "hawk",
      "nubian",
      "bulbous",
      "flat",
      "fleshy",
    ].map(s => `/imgs/head/noses/${s}.png`),
    // bridge width
    ...["narrow", "average", "wide"].map(
      w => `/imgs/head/noses/${w}-bridge.png`,
    ),
    // bridge height
    ...["short", "average", "tall"].map(
      h => `/imgs/head/noses/${h}-bridge-h.png`,
    ),
    // nostril size
    ...["small", "average", "large"].map(
      sz => `/imgs/head/noses/${sz}-nostril.png`,
    ),
    // nostril flare
    ...["minimal", "moderate", "wide"].map(
      fl => `/imgs/head/noses/${fl}-flare.png`,
    ),
    // length
    ...["short", "average", "long"].map(
      l => `/imgs/head/noses/${l}-length.png`,
    ),
    // tip angle
    ...["upturned", "neutral", "downturned"].map(
      a => `/imgs/head/noses/${a}-tip.png`,
    ),
  ];

  it.each(ALL_NOSE_IMAGES)(
    "mock Image(%s) should fire onload, not onerror",
    async src => {
      const diskPath = path.join(PUBLIC_DIR, src);
      const exists = fs.existsSync(diskPath);

      // Simulate: if the file exists on disk, the browser would fire onload
      const img = new Image();
      const loaded = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () =>
          reject(new Error(`Image.onerror fired for: ${src}`));
        // In jsdom, setting src doesn't actually load — we simulate the outcome
        if (exists) {
          // File exists → simulate successful load
          img.onload?.(new Event("load"));
        } else {
          img.onerror?.(new Event("error"));
        }
      });

      await expect(loaded).resolves.toBeUndefined();
    },
  );
});
