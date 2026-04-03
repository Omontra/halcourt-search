import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Robot } from "./components/Robot";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Scanning } from "./scenes/Scene2Scanning";
import { Scene3Matching } from "./scenes/Scene3Matching";
import { Scene4Presenting } from "./scenes/Scene4Presenting";
import { Background } from "./components/Background";

export const RiqVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0e1a" }}>
      <Background frame={frame} />

      {/* Scene 1: RIQ appears (0-4s) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Intro />
      </Sequence>

      {/* Scene 2: RIQ scans resumes (4-8s) */}
      <Sequence from={120} durationInFrames={120}>
        <Scene2Scanning />
      </Sequence>

      {/* Scene 3: RIQ matches candidates (8-12s) */}
      <Sequence from={240} durationInFrames={120}>
        <Scene3Matching />
      </Sequence>

      {/* Scene 4: RIQ presents results (12-15s) */}
      <Sequence from={360} durationInFrames={90}>
        <Scene4Presenting />
      </Sequence>
    </AbsoluteFill>
  );
};
