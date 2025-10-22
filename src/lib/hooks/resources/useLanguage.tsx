import { useEffect, useState } from "react";
import { AvailableLang } from "../../declarations/types/utils";
import { FORM_DICT } from "../../states/lang/forms";
import { DEFAULTS } from "../../states/default";

export default function useLanguage(): {
  lang: AvailableLang;
  setLang: (lang: AvailableLang) => void;
  dict: () => (typeof FORM_DICT)[AvailableLang];
} {
  const [lang, setLang] = useState<AvailableLang>(DEFAULTS.LANG),
    dict = () => FORM_DICT[lang];
  useEffect(() => {
    ["en", "pt", "es", "fr", "it", "zh"].includes(
      window.navigator.language.slice(0, 2)
    ) && setLang(window.navigator.language.slice(0, 2) as AvailableLang);
  }, [setLang]);
  return { lang, setLang, dict };
}
