import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Robot } from "../components/Robot";

const ResumeCard: React.FC<{
  x: number;
  y: number;
  delay: number;
  frame: number;
  fps: number;
  name: string;
  role: string;
  scanned: boolean;
}> = ({ x, y, delay, frame, fps, name, role, scanned }) => {
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  const scanProgress = interpolate(
    frame,
    [delay + 20, delay + 50],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 200,
        height: 260,
        backgroundColor: "rgba(13, 26, 46, 0.9)",
        border: `2px solid ${scanned ? "rgba(74, 220, 255, 0.8)" : "rgba(58, 90, 138, 0.6)"}`,
        borderRadius: 12,
        padding: 15,
        opacity: appear,
        transform: `scale(${appear}) translateY(${(1 - appear) * 30}px)`,
        boxShadow: scanned
          ? "0 0 20px rgba(74, 220, 255, 0.3)"
          : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Avatar placeholder */}
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: "rgba(74, 158, 255, 0.2)",
          border: "2px solid rgba(74, 158, 255, 0.4)",
          margin: "0 auto 10px",
        }}
      />
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 16,
          fontFamily: "system-ui",
          fontWeight: 600,
        }}
      >
        {name}
      </div>
      <div
        style={{
          textAlign: "center",
          color: "#8ab4f8",
          fontSize: 12,
          fontFamily: "system-ui",
          marginTop: 4,
        }}
      >
        {role}
      </div>

      {/* Skill bars */}
      {[0.85, 0.72, 0.93, 0.68].map((val, i) => (
        <div
          key={i}
          style={{
            marginTop: 8,
            height: 6,
            backgroundColor: "rgba(74, 158, 255, 0.1)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${val * scanProgress * 100}%`,
              height: "100%",
              backgroundColor: "rgba(74, 220, 255, 0.7)",
              borderRadius: 3,
            }}
          />
        </div>
      ))}

      {/* Scan line effect */}
      {scanProgress > 0 && scanProgress < 1 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: `${scanProgress * 100}%`,
            width: "100%",
            height: 2,
            backgroundColor: "#4adcff",
            boxShadow: "0 0 10px #4adcff",
          }}
        />
      )}
    </div>
  );
};

export const Scene2Scanning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Robot arm animates as scanning
  const armAngle = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [-15, 15]
  );

  const headTilt = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [-5, 5]
  );

  // Scan beam from robot's eyes
  const beamOpacity = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.1, 0.4]
  );

  const candidates = [
    { name: "Sarah Chen", role: "CTO", x: 80, y: 200, delay: 5 },
    { name: "James Park", role: "VP Engineering", x: 330, y: 150, delay: 20 },
    { name: "Elena Volkov", role: "Head of Data", x: 80, y: 520, delay: 35 },
    { name: "David Mbeki", role: "Tech Lead", x: 330, y: 480, delay: 50 },
  ];

  return (
    <AbsoluteFill>
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], {
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
          Scanning Talent Pool
        </span>
        <div style={{ marginTop: 8 }}>
          <span
            style={{
              fontSize: 18,
              fontFamily: "monospace",
              color: "#4adcff",
            }}
          >
            {`> analyzing ${Math.min(Math.floor(frame * 12), 1247)} profiles...`}
          </span>
        </div>
      </div>

      {/* Resume cards on the left side */}
      {candidates.map((c, i) => (
        <ResumeCard
          key={i}
          {...c}
          frame={frame}
          fps={fps}
          scanned={frame > c.delay + 50}
        />
      ))}

      {/* Scan beam */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", opacity: beamOpacity }}
      >
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="#4adcff" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#4adcff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <polygon
          points={`1050,420 600,${200 + Math.sin(frame * 0.05) * 100} 600,${400 + Math.sin(frame * 0.05) * 100}`}
          fill="url(#beam)"
        />
      </svg>

      <Robot
        x={1200}
        y={500}
        scale={0.9}
        eyeGlow={1}
        armAngle={armAngle}
        headTilt={headTilt}
      />
    </AbsoluteFill>
  );
};
