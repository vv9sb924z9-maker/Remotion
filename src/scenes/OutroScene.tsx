import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../font";
import { Headline } from "../elements/Headline";

const OutroSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Headline
        name="Tip"
        style={{
          color: colors.cream,
          fontSize: 88,
          fontWeight: 900,
          maxWidth: 900,
          marginBottom: 100,
          scale: interpolate(frame, [0, 0.8 * fps], [0.8, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 14 }),
            output: "perceptual-scale",
          }),
        }}
      >
        خلّه مقفّل وفي مكان ناشف… ويعيش معك سنين
      </Headline>
      <Headline
        name="Follow"
        style={{
          color: colors.background,
          backgroundColor: colors.honey,
          fontSize: 56,
          fontWeight: 700,
          padding: "20px 56px",
          borderRadius: 999,
          opacity: interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        تابعنا لمعلومات أكثر
      </Headline>
    </>
  );
};

export const OutroScene = Interactive.create({
  Component: OutroSceneInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
