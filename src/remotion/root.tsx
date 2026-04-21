import { Composition, registerRoot } from "remotion";
import { FounderReachDemoVideo, FOUNDERREACH_DEMO_DURATION, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "./videos/founderreach-demo";

const Root = () => {
  return (
    <Composition
      id="FounderReachProductDemo"
      component={FounderReachDemoVideo}
      durationInFrames={FOUNDERREACH_DEMO_DURATION}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};

registerRoot(Root);
