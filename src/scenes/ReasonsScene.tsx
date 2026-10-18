import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../font";
import { Headline } from "../elements/Headline";
import { ReasonCard } from "../elements/ReasonCard";

const ReasonsSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Headline
        name="Why"
        style={{
          color: colors.honey,
          fontSize: 120,
          fontWeight: 900,
          marginBottom: 60,
        }}
      >
        ليش؟
      </Headline>
      <ReasonCard
        name="Reason 1"
        number="١"
        style={{
          marginBottom: 36,
          opacity: interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [0.5 * fps, 1 * fps],
            ["-80px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        فيه ماي قليل جداً، فالبكتيريا ما تقدر تعيش فيه
      </ReasonCard>
      <ReasonCard
        name="Reason 2"
        number="٢"
        style={{
          marginBottom: 36,
          opacity: interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [2 * fps, 2.5 * fps],
            ["-80px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        حمضي، وهذا يمنع نمو الجراثيم
      </ReasonCard>
      <ReasonCard
        name="Reason 3"
        number="٣"
        style={{
          opacity: interpolate(frame, [3.5 * fps, 4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [3.5 * fps, 4 * fps],
            ["-80px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        النحل يضيف له إنزيم يطلّع مادة تقتل البكتيريا
      </ReasonCard>
    </>
  );
};

export const ReasonsScene = Interactive.create({
  Component: ReasonsSceneInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
