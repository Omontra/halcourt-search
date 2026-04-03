import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Robot } from "../components/Robot";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Robot slides up from below
  const robotY = spring({
    frame,
    fps,
    from: 800,
    to: 480,
    config: { damping: 12, stiffness: 80 },
  });

  // Title fades in
  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = spring({
    frame: Math.max(0, frame - 30),
    fps,
    from: 40,
    to: 0,
    config: { damping: 12 },
  });

  // Subtitle fades in
  const subtitleOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Eye glow intensifies
  const eyeGlow = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Power-up ring effect
  const ringScale = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 0,
    to: 1,
    config: { damping: 8 },
  });
  const ringOpacity = interpolate(frame, [15, 90], [0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Power-up ring effect behind robot */}
      <div
        style={{
          position: "absolute",
          left: 960 - 150 * ringScale,
          top: robotY - 80 - 150 * ringScale,
          width: 300 * ringScale,
          height: 300 * ringScale,
          borderRadius: "50%",
          border: "3px solid rgba(74, 220, 255, 0.6)",
          opacity: ringOpacity,
          boxShadow: "0 0 40px rgba(74, 220, 255, 0.3)",
        }}
      />

      <Robot x={960} y={robotY} scale={1.1} eyeGlow={eyeGlow} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120 + titleY,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            color: "white",
            letterSpacing: 8,
            textShadow: "0 0 40px rgba(74, 158, 255, 0.8)",
          }}
        >
          Meet{" "}
          <span style={{ color: "#4adcff" }}>RIQ</span>
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 200,
          width: "100%",
          textAlign: "center",
          opacity: subtitleOpacity,
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontFamily: "system-ui, sans-serif",
            color: "#8ab4f8",
            letterSpacing: 3,
          }}
        >
          Your AI Recruitment Intelligence
        </span>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [70, 100], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontFamily: "monospace",
            color: "#4a9eff",
            letterSpacing: 2,
          }}
        >
          HALCOURT SEARCH
        </span>
      </div>
    </AbsoluteFill>
  );
};
