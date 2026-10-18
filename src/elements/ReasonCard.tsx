import type React from "react";
import { Interactive, type InteractivitySchema } from "remotion";
import { colors, fontFamily } from "../font";

type ReasonCardProps = {
  readonly children: React.ReactNode;
  readonly number: string;
  readonly style?: React.CSSProperties;
};

const ReasonCardInner: React.FC<ReasonCardProps> = ({
  children,
  number,
  style,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 36,
      width: 920,
      padding: "36px 44px",
      borderRadius: 32,
      backgroundColor: "rgba(245, 166, 35, 0.12)",
      border: `3px solid ${colors.honey}`,
      direction: "rtl",
      fontFamily,
      color: colors.cream,
      fontSize: 50,
      fontWeight: 700,
      lineHeight: 1.4,
      ...style,
    }}
  >
    <div
      style={{
        flexShrink: 0,
        width: 104,
        height: 104,
        borderRadius: 52,
        backgroundColor: colors.honey,
        color: colors.background,
        fontSize: 60,
        fontWeight: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {number}
    </div>
    <div>{children}</div>
  </div>
);

const reasonCardSchema = {
  ...Interactive.childrenSchema,
  ...Interactive.textSchema,
  number: { type: "string", default: "١", description: "Number" },
} as const satisfies InteractivitySchema;

export const ReasonCard = Interactive.create({
  Component: ReasonCardInner,
  layout: "none",
  schema: reasonCardSchema,
});
