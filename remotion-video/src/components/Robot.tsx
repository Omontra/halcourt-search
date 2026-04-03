import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface RobotProps {
  scale?: number;
  x?: number;
  y?: number;
  eyeGlow?: number;
  armAngle?: number;
  talking?: boolean;
  headTilt?: number;
}

export const Robot: React.FC<RobotProps> = ({
  scale = 1,
  x = 960,
  y = 540,
  eyeGlow = 1,
  armAngle = 0,
  talking = false,
  headTilt = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Idle breathing animation
  const breathe = Math.sin(frame * 0.05) * 3;
  // Eye pulse
  const eyePulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.7, 1]
  );
  // Antenna glow
  const antennaGlow = interpolate(
    Math.sin(frame * 0.12),
    [-1, 1],
    [0.4, 1]
  );
  // Mouth animation for talking
  const mouthOpen = talking
    ? interpolate(Math.sin(frame * 0.4), [-1, 1], [2, 8])
    : 3;

  return (
    <svg
      width={400 * scale}
      height={500 * scale}
      viewBox="0 0 400 500"
      style={{
        position: "absolute",
        left: x - (200 * scale),
        top: y - (250 * scale) + breathe,
        filter: `drop-shadow(0 0 30px rgba(74, 158, 255, 0.3))`,
      }}
    >
      {/* Antenna */}
      <g transform={`rotate(${headTilt * 0.5}, 200, 80)`}>
        <line
          x1={200}
          y1={80}
          x2={200}
          y2={30}
          stroke="#5a6a8a"
          strokeWidth={4}
        />
        <circle
          cx={200}
          cy={25}
          r={8}
          fill={`rgba(74, 220, 255, ${antennaGlow})`}
        />
        <circle
          cx={200}
          cy={25}
          r={14}
          fill="none"
          stroke={`rgba(74, 220, 255, ${antennaGlow * 0.4})`}
          strokeWidth={2}
        />
      </g>

      {/* Head */}
      <g transform={`rotate(${headTilt}, 200, 140)`}>
        <rect
          x={120}
          y={80}
          width={160}
          height={120}
          rx={25}
          fill="#1a2744"
          stroke="#3a5a8a"
          strokeWidth={3}
        />
        {/* Face plate */}
        <rect
          x={135}
          y={95}
          width={130}
          height={90}
          rx={15}
          fill="#0d1a2e"
          stroke="#2a4a6a"
          strokeWidth={1}
        />

        {/* Left eye */}
        <ellipse
          cx={170}
          cy={135}
          rx={18}
          ry={15}
          fill={`rgba(74, 220, 255, ${eyeGlow * eyePulse * 0.3})`}
        />
        <ellipse
          cx={170}
          cy={135}
          rx={12}
          ry={10}
          fill={`rgba(74, 220, 255, ${eyeGlow * eyePulse})`}
        />
        <ellipse cx={170} cy={133} rx={4} ry={3} fill="white" opacity={0.8} />

        {/* Right eye */}
        <ellipse
          cx={230}
          cy={135}
          rx={18}
          ry={15}
          fill={`rgba(74, 220, 255, ${eyeGlow * eyePulse * 0.3})`}
        />
        <ellipse
          cx={230}
          cy={135}
          rx={12}
          ry={10}
          fill={`rgba(74, 220, 255, ${eyeGlow * eyePulse})`}
        />
        <ellipse cx={230} cy={133} rx={4} ry={3} fill="white" opacity={0.8} />

        {/* Mouth */}
        <rect
          x={175}
          y={160}
          width={50}
          height={mouthOpen}
          rx={mouthOpen / 2}
          fill={`rgba(74, 220, 255, ${talking ? 0.8 : 0.4})`}
        />

        {/* Ear details */}
        <rect
          x={110}
          y={110}
          width={12}
          height={40}
          rx={6}
          fill="#2a4a6a"
        />
        <rect
          x={278}
          y={110}
          width={12}
          height={40}
          rx={6}
          fill="#2a4a6a"
        />
      </g>

      {/* Neck */}
      <rect x={185} y={200} width={30} height={25} rx={5} fill="#2a3a5a" />

      {/* Body */}
      <rect
        x={130}
        y={225}
        width={140}
        height={150}
        rx={20}
        fill="#1a2744"
        stroke="#3a5a8a"
        strokeWidth={3}
      />
      {/* Chest plate / core */}
      <circle
        cx={200}
        cy={290}
        r={30}
        fill="#0d1a2e"
        stroke="#3a5a8a"
        strokeWidth={2}
      />
      <circle
        cx={200}
        cy={290}
        r={20}
        fill={`rgba(74, 158, 255, ${0.3 + eyePulse * 0.3})`}
      />
      <circle cx={200} cy={290} r={10} fill={`rgba(74, 220, 255, ${eyePulse})`} />
      {/* RIQ label */}
      <text
        x={200}
        y={345}
        textAnchor="middle"
        fill="#4a9eff"
        fontSize={18}
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing={4}
      >
        RIQ
      </text>

      {/* Left arm */}
      <g
        transform={`rotate(${armAngle}, 130, 240)`}
        style={{ transformOrigin: "130px 240px" }}
      >
        <rect
          x={80}
          y={235}
          width={50}
          height={20}
          rx={10}
          fill="#2a3a5a"
          stroke="#3a5a8a"
          strokeWidth={2}
        />
        <rect
          x={65}
          y={250}
          width={22}
          height={70}
          rx={10}
          fill="#1a2744"
          stroke="#3a5a8a"
          strokeWidth={2}
        />
        {/* Hand */}
        <circle cx={76} cy={325} r={15} fill="#2a3a5a" stroke="#3a5a8a" strokeWidth={2} />
      </g>

      {/* Right arm */}
      <g
        transform={`rotate(${-armAngle}, 270, 240)`}
        style={{ transformOrigin: "270px 240px" }}
      >
        <rect
          x={270}
          y={235}
          width={50}
          height={20}
          rx={10}
          fill="#2a3a5a"
          stroke="#3a5a8a"
          strokeWidth={2}
        />
        <rect
          x={313}
          y={250}
          width={22}
          height={70}
          rx={10}
          fill="#1a2744"
          stroke="#3a5a8a"
          strokeWidth={2}
        />
        {/* Hand */}
        <circle cx={324} cy={325} r={15} fill="#2a3a5a" stroke="#3a5a8a" strokeWidth={2} />
      </g>

      {/* Legs */}
      <rect x={155} y={375} width={25} height={70} rx={10} fill="#1a2744" stroke="#3a5a8a" strokeWidth={2} />
      <rect x={220} y={375} width={25} height={70} rx={10} fill="#1a2744" stroke="#3a5a8a" strokeWidth={2} />
      {/* Feet */}
      <rect x={140} y={440} width={55} height={18} rx={9} fill="#2a3a5a" stroke="#3a5a8a" strokeWidth={2} />
      <rect x={205} y={440} width={55} height={18} rx={9} fill="#2a3a5a" stroke="#3a5a8a" strokeWidth={2} />
    </svg>
  );
};
