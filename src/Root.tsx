import { Composition, Folder } from "remotion";
import { Headline } from "./elements/Headline";
import { ReasonCard } from "./elements/ReasonCard";
import { HoneyFortress } from "./collage/HoneyFortress";
import { HoneyFact } from "./HoneyFact";
import { HookScene } from "./scenes/HookScene";
import { NumberScene } from "./scenes/NumberScene";
import { OutroScene } from "./scenes/OutroScene";
import { ReasonsScene } from "./scenes/ReasonsScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HoneyFact"
        component={HoneyFact}
        durationInFrames={495}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Scenes">
        <Composition
          id="HookScene"
          component={HookScene}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            style: {
              backgroundColor: "#1a1206",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        />
        <Composition
          id="NumberScene"
          component={NumberScene}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            style: {
              backgroundColor: "#22180a",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        />
        <Composition
          id="ReasonsScene"
          component={ReasonsScene}
          durationInFrames={195}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            style: {
              backgroundColor: "#1a1206",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        />
        <Composition
          id="OutroScene"
          component={OutroScene}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            style: {
              backgroundColor: "#22180a",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        />
      </Folder>
      <Folder name="Collage">
        <Composition
          id="HoneyFortress"
          component={HoneyFortress}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Elements">
        <Composition
          id="Headline"
          component={Headline}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            children: "العسل ما يخرب أبداً",
            style: {
              color: "#fff4dc",
              backgroundColor: "#1a1206",
              fontSize: 130,
              fontWeight: 900,
            },
          }}
        />
        <Composition
          id="ReasonCard"
          component={ReasonCard}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            number: "١",
            children: "فيه ماي قليل جداً، فالبكتيريا ما تقدر تعيش فيه",
            style: {},
          }}
        />
      </Folder>
    </>
  );
};
