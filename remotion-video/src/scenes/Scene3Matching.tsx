import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Robot } from "../components/Robot";

export const Scene3Matching: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Robot is centered and working
  const armAngle = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [-20, 20]
  );

  // Connection lines animate
  const connectionProgress = interpolate(frame, [10, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Match score reveals
  const scoreReveal = (delay: number) =>
    spring({
      frame: Math.max(0, frame - delay),
      fps,
      from: 0,
      to: 1,
      config: { damping: 12 },
    });

  const matches = [
    { name: "Sarah Chen", score: 97, x: 250, y: 250, delay: 30 },
    { name: "James Park", score: 92, x: 1550, y: 250, delay: 45 },
    { name: "Elena Volkov", score: 88, x: 250, y: 700, delay: 60 },
    { name: "David Mbeki", score: 85, x: 1550, y: 700, delay: 75 },
  ];

  return (
    <AbsoluteFill>
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            fontFamily: "system-ui",
            color: "white",
            letterSpacing: 3,
          }}
        >
          AI-Powered Matching
        </span>
      </div>

      {/* Connection lines from robot to candidates */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="#4adcff" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#4a9eff" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        {matches.map((m, i) => {
          const progress = interpolate(
            frame,
            [m.delay, m.delay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const endX = 960 + (m.x - 960) * progress;
          const endY = 490 + (m.y - 490) * progress;
          return (
            <g key={i}>
              <line
                x1={960}
                y1={490}
                x2={endX}
                y2={endY}
                stroke="url(#connGrad)"
                strokeWidth={2}
                strokeDasharray="8,4"
                opacity={progress * 0.7}
              />
              {/* Data flow dots along the line */}
              {progress > 0.3 &&
                [0.3, 0.5, 0.7].map((t, j) => {
                  const dotPos = ((frame * 0.02 + j * 0.33 + i * 0.25) % 1);
                  const dx = 960 + (m.x - 960) * dotPos * progress;
                  const dy = 490 + (m.y - 490) * dotPos * progress;
                  return (
                    <circle
                      key={j}
                      cx={dx}
                      cy={dy}
                      r={3}
                      fill="#4adcff"
                      opacity={0.8}
                    />
                  );
                })}
            </g>
          );
        })}
      </svg>

      {/* Match cards */}
      {matches.map((m, i) => {
        const s = scoreReveal(m.delay);
        const scoreColor =
          m.score >= 95
            ? "#00ff88"
            : m.score >= 90
              ? "#4adcff"
              : "#f0c040";

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: m.x - 100,
              top: m.y - 50,
              width: 200,
              height: 100,
              backgroundColor: "rgba(13, 26, 46, 0.95)",
              border: `2px solid ${scoreColor}40`,
              borderRadius: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: s,
              transform: `scale(${s})`,
              boxShadow: `0 0 25px ${scoreColor}30`,
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "system-ui",
              }}
            >
              {m.name}
            </div>
            <div
              style={{
                color: scoreColor,
                fontSize: 32,
                fontWeight: 800,
                fontFamily: "monospace",
                marginTop: 4,
              }}
            >
              {Math.round(m.score * s)}%
            </div>
            <div
              style={{
                color: "#8ab4f8",
                fontSize: 11,
                fontFamily: "monospace",
                marginTop: 2,
              }}
            >
              MATCH SCORE
            </div>
          </div>
        );
      })}

      <Robot
        x={960}
        y={490}
        scale={0.8}
        eyeGlow={1}
        armAngle={armAngle}
        talking={frame > 20 && frame < 100}
      />
    </AbsoluteFill>
  );
};
