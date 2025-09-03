import { ImageStyle, QuestionId } from "../declarations/types/helpers";

export const FORMS_OPTS: Record<
  QuestionId,
  { [K in ImageStyle]: { friendlyName: string; src: string } }
> = {
  stl: {
    anime: { friendlyName: "Anime", src: "/imgs/dall-e-pyromancer-6.jpeg" },
    photorealistic: { friendlyName: "Photorealistic", src: "" },
    sketch: { friendlyName: "Sketch", src: "" },
    cartoon: { friendlyName: "Cartoon", src: "" },
    pixel: { friendlyName: "Pixel", src: "" },
    "semi-realistic": {
      friendlyName: "Semi-Realistic",
      src: "/imgs/dalle_elf_dancer.webp",
    },
  },
};
