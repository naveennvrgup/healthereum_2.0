import I18n from "i18n-js";

import en from "./Languages/en";
import gu from "./Languages/gu";
import hi from "./Languages/hi";
import ml from "./Languages/ml";
import mr from "./Languages/mr";
import ta from "./Languages/ta";
import te from "./Languages/te";
import ur from "./Languages/ur";
import pa from "./Languages/pa";

I18n.fallbacks = true;
I18n.translations = {
    en,
    gu,
    hi,
    ml,
    mr,
    ta,
    te,
    ur,
    pa
};

export default I18n;