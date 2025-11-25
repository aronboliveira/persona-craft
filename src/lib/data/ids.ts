import { IdKeys } from "../declarations/types/utils";

const APP_IDS = Object.freeze<Readonly<{ [K in IdKeys]: string }>>({
  FORM_ID: "mainStyleForm",
  GENDER_FORM_ID: "genderForm",
});
export default APP_IDS;
