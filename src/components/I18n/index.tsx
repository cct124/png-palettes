import { useEffect, useState } from "react";
import { I18n, I18N_TYPE, zhCN, languages } from "@src/context/i18n";

export default function Theming({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string | number;
}) {
  const useI18nState = useState<I18N_TYPE>(zhCN);

  useEffect(() => {
    const id = window.$local.i18n;
    if (id !== undefined) {
      const language = languages.find((lan) => lan.id === id);
      if (language) {
        useI18nState[1](language.data);
        window.$local.i18n = id;
      }
    }
  });

  return <I18n.Provider value={useI18nState}>{children}</I18n.Provider>;
}
