import { ObjectMapper } from "../../classes/mappers/ObjectMapper";
export const TOKENS = ObjectMapper.deepFreeze({
  transfer: {
    files: "Files",
    textPlain: "text/plain",
  },
  inputTypes: {
    file: "file",
    date: "date",
    datetimeLocal: "datetime-local",
    time: "time",
    week: "week",
    month: "month",
  },
  mime: {
    textPlain: "text/plain",
  },
  accepts: {
    pdf: ".pdf, application/pdf",
    imageAny: "image/*",
  },
  mimes: {
    jpeg: "image/jpeg",
    png: "image/png",
    pdf: "application/pdf",
  },
  rx: {
    safeFilename: /[^a-zA-Z0-9._-]/g,
  },
});
