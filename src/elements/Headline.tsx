import type React from "react";
import { Interactive } from "remotion";
import { fontFamily } from "../font";

const HeadlineInner = ({
  children,
  style,
}: {
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}) => (
  <h1
    style={{
      margin: 0,
      fontFamily,
      direction: "rtl",
      textAlign: "center",
      lineHeight: 1.3,
      ...style,
    }}
  >
    {children}
  </h1>
);

export const Headline = Interactive.create({
  Component: HeadlineInner,
  layout: "none",
  schema: {
    ...Interactive.textSchema,
    ...Interactive.childrenSchema,
  },
});
