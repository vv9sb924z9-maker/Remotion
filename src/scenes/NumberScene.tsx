import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../font";
import { Headline } from "../elements/Headline";

const NumberSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Headline
        name="Years"
        style={{
          color: colors.honey,
          fontSize: 260,
          fontWeight: 900,
          lineHeight: 1,
          direction: "ltr",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        +
        {Math.round(
          interpolate(frame, [0, 1.5 * fps], [0, 3000], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        )}
      </Headline>
      <Headline
        name="Years label"
        style={{
          color: colors.cream,
          fontSize: 84,
          fontWeight: 900,
          marginBottom: 80,
        }}
      >
        سنة
      </Headline>
      <Headline
        name="Explanation"
        style={{
          color: colors.cream,
          fontSize: 56,
          fontWeight: 700,
          maxWidth: 880,
          opacity: interpolate(frame, [1.5 * fps, 2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [1.5 * fps, 2 * fps],
            ["0px 40px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        عمر عسل لقوه علماء الآثار في مقابر الفراعنة… وكان لسّه صالح للأكل!
      </Headline>
    </>
  );
};

export const NumberScene = Interactive.create({
  Component: NumberSceneInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
