import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Cairo is a variable font, bundled locally so rendering doesn't depend on
// reaching Google Fonts.
export const fontFamily = "Cairo";

loadFont({
  family: fontFamily,
  url: staticFile("fonts/Cairo-Arabic.woff2"),
  weight: "200 1000",
  unicodeRange:
    "U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC",
});

loadFont({
  family: fontFamily,
  url: staticFile("fonts/Cairo-Latin.woff2"),
  weight: "200 1000",
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
});

export const colors = {
  background: "#1a1206",
  honey: "#f5a623",
  cream: "#fff4dc",
};
