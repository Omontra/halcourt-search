import React from "react";
import { AbsoluteFill, interpolate } from "remotion";

export const Background: React.FC<{ frame: number }> = ({ frame }) => {
  // Subtle grid animation
  const gridOffset = interpolate(frame, [0, 450], [0, -200]);

  return (
    <AbsoluteFill>
      {/* Gradient background */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 50%, #0f1b3d 0%, #070b17 70%)",
        }}
      />
      {/* Animated grid lines */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.08 }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 50 + (gridOffset % 50)}
            x2={1920}
            y2={i * 50 + (gridOffset % 50)}
            stroke="#4a9eff"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 40 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 50}
            y1={0}
            x2={i * 50}
            y2={1080}
            stroke="#4a9eff"
            strokeWidth={1}
          />
        ))}
      </svg>
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (i * 137.5) % 1920;
        const baseY = (i * 83.7) % 1080;
        const y = baseY + Math.sin((frame + i * 30) * 0.03) * 30;
        const opacity = interpolate(
          Math.sin((frame + i * 20) * 0.02),
          [-1, 1],
          [0.1, 0.4]
        );
        const size = 2 + (i % 3) * 2;
        return (
          <div
            key={`p${i}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "#4a9eff",
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
