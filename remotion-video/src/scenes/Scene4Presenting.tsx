import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Robot } from "../components/Robot";

export const Scene4Presenting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Top candidate card slides in
  const cardSlide = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: -400,
    to: 350,
    config: { damping: 14, stiffness: 80 },
  });

  const cardOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Checkmarks appear sequentially
  const check = (delay: number) =>
    spring({
      frame: Math.max(0, frame - delay),
      fps,
      from: 0,
      to: 1,
      config: { damping: 10 },
    });

  // Final CTA
  const ctaOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = spring({
    frame: Math.max(0, frame - 55),
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12 },
  });

  // Celebration particles
  const showParticles = frame > 30;

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
          Top Candidate Identified
        </span>
      </div>

      {/* Celebration particles */}
      {showParticles &&
        Array.from({ length: 15 }).map((_, i) => {
          const angle = (i / 15) * Math.PI * 2;
          const dist = 80 + (frame - 30) * 2;
          const px = 500 + Math.cos(angle) * dist;
          const py = 450 + Math.sin(angle) * dist;
          const opacity = interpolate(
            frame,
            [30, 70],
            [0.8, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: px,
                top: py,
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: i % 3 === 0 ? "#4adcff" : i % 3 === 1 ? "#00ff88" : "#f0c040",
                opacity,
              }}
            />
          );
        })}

      {/* Featured candidate card */}
      <div
        style={{
          position: "absolute",
          left: cardSlide,
          top: 200,
          width: 320,
          height: 500,
          backgroundColor: "rgba(13, 26, 46, 0.95)",
          border: "2px solid rgba(0, 255, 136, 0.5)",
          borderRadius: 20,
          padding: 25,
          opacity: cardOpacity,
          boxShadow: "0 0 40px rgba(0, 255, 136, 0.2)",
        }}
      >
        {/* Profile image placeholder */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "rgba(0, 255, 136, 0.15)",
            border: "3px solid rgba(0, 255, 136, 0.5)",
            margin: "0 auto 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 36, color: "#00ff88" }}>S</span>
        </div>

        <div style={{ textAlign: "center", color: "white", fontSize: 24, fontWeight: 700, fontFamily: "system-ui" }}>
          Sarah Chen
        </div>
        <div style={{ textAlign: "center", color: "#00ff88", fontSize: 14, fontFamily: "monospace", marginTop: 5 }}>
          97% MATCH
        </div>
        <div style={{ textAlign: "center", color: "#8ab4f8", fontSize: 14, fontFamily: "system-ui", marginTop: 3 }}>
          Chief Technology Officer
        </div>

        {/* Verification checks */}
        {[
          { label: "Technical Skills", delay: 25 },
          { label: "Leadership Experience", delay: 32 },
          { label: "Culture Fit", delay: 39 },
          { label: "Availability", delay: 46 },
          { label: "Compensation Aligned", delay: 53 },
        ].map((item, i) => {
          const c = check(item.delay);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 14,
                opacity: c,
                transform: `translateX(${(1 - c) * 20}px)`,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 255, 136, 0.2)",
                  border: "2px solid #00ff88",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                  fontSize: 12,
                  color: "#00ff88",
                }}
              >
                ✓
              </div>
              <span
                style={{
                  color: "#c0d4f0",
                  fontSize: 14,
                  fontFamily: "system-ui",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <Robot
        x={1100}
        y={480}
        scale={1}
        eyeGlow={1}
        armAngle={-15}
        talking={frame > 10 && frame < 50}
        headTilt={-3}
      />

      {/* CTA / Closing */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "18px 50px",
            borderRadius: 50,
            background: "linear-gradient(135deg, #4a9eff 0%, #4adcff 100%)",
            boxShadow: "0 0 30px rgba(74, 158, 255, 0.4)",
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              fontFamily: "system-ui",
              color: "white",
              letterSpacing: 2,
            }}
          >
            HALCOURT SEARCH
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span
            style={{
              fontSize: 16,
              fontFamily: "monospace",
              color: "#8ab4f8",
              letterSpacing: 1,
            }}
          >
            Powered by RIQ — AI Recruitment Intelligence
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
