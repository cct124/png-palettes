import { useState } from "react";
import { I18n, I18N_TYPE, zhCN } from "@src/context/i18n";

export default function Theming({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string | number;
}) {
  const useI18nState = useState<I18N_TYPE>(zhCN);

  return <I18n.Provider value={useI18nState}>{children}</I18n.Provider>;
}
