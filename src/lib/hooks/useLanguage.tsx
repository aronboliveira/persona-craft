import { useEffect, useState } from "react";
import { AvailableLangs } from "../declarations/types/utils";
import { DEFAULTS } from "../states/default";
import { FORM_DICT } from "../states/lang/forms";

export default function useLanguage(): {
  lang: AvailableLangs;
  setLang: (lang: AvailableLangs) => void;
  dict: () => (typeof FORM_DICT)[AvailableLangs];
} {
  const [lang, setLang] = useState<AvailableLangs>(DEFAULTS.LANG),
    dict = () => FORM_DICT[lang];
  useEffect(() => {
    ["en", "pt", "es", "fr", "it", "zh"].includes(
      window.navigator.language.slice(0, 2)
    ) && setLang(window.navigator.language.slice(0, 2) as AvailableLangs);
  }, [setLang]);
  return { lang, setLang, dict };
}
