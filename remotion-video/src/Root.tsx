import { Composition } from "remotion";
import { RiqVideo } from "./RiqVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="RiqVideo"
      component={RiqVideo}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
