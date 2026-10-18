import { Track, useVideoConfig } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { NumberScene } from "./scenes/NumberScene";
import { OutroScene } from "./scenes/OutroScene";
import { ReasonsScene } from "./scenes/ReasonsScene";

export const HoneyFact = () => {
  const { fps } = useVideoConfig();

  return (
    <Track name="Scenes">
      <HookScene
        name="Hook"
        durationInFrames={3 * fps}
        style={{
          backgroundColor: "#1a1206",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <NumberScene
        name="3000 years"
        from={3 * fps}
        durationInFrames={4 * fps}
        style={{
          backgroundColor: "#22180a",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <ReasonsScene
        name="Reasons"
        from={7 * fps}
        durationInFrames={6.5 * fps}
        style={{
          backgroundColor: "#1a1206",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <OutroScene
        name="Outro"
        from={13.5 * fps}
        durationInFrames={3 * fps}
        style={{
          backgroundColor: "#22180a",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </Track>
  );
};
