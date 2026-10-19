import type React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Paper-collage B-roll: "honey never spoils, because bacteria find no water in it".
// The pieces start off-screen and slide in one by one, animated on twos for a stop-motion feel.

const BACKGROUND = "#D9A21B";

type Piece = {
  readonly id: string;
  readonly src: string;
  readonly width: number;
  // final centre position, in px
  readonly x: number;
  readonly y: number;
  readonly rotate: number;
  // where the piece enters from, relative to its final position
  readonly fromX: number;
  readonly fromY: number;
  readonly enterAt: number;
  // optional push-back away from the jar at the end
  readonly recoilX?: number;
  readonly recoilY?: number;
  readonly flip?: boolean;
};

const RECOIL_AT = 104;

const PIECES: Piece[] = [
  { id: "jar", src: "collage/honey/jar.png", width: 700, x: 540, y: 1080, rotate: -1, fromX: 0, fromY: 1400, enterAt: 6 },
  { id: "dipper", src: "collage/honey/dipper.png", width: 460, x: 610, y: 590, rotate: 8, fromX: 300, fromY: -1100, enterAt: 26 },
  { id: "bacterium-1", src: "collage/honey/bacterium.png", width: 250, x: 170, y: 1500, rotate: 28, fromX: -700, fromY: 200, enterAt: 46, recoilX: -170, recoilY: 120 },
  { id: "bacterium-2", src: "collage/honey/bacterium.png", width: 220, x: 930, y: 1360, rotate: -22, fromX: 650, fromY: 0, enterAt: 56, recoilX: 180, recoilY: 40, flip: true },
  { id: "bacterium-3", src: "collage/honey/bacterium.png", width: 200, x: 220, y: 760, rotate: -35, fromX: -600, fromY: -250, enterAt: 66, recoilX: -190, recoilY: -110 },
  { id: "drop", src: "collage/honey/drop.png", width: 240, x: 860, y: 520, rotate: 10, fromX: 0, fromY: -800, enterAt: 82 },
];

const PaperPiece: React.FC<{ readonly piece: Piece; readonly frame: number }> = ({ piece, frame }) => {
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - piece.enterAt, fps, config: { damping: 14, stiffness: 160, mass: 0.7 } });
  const recoil = piece.recoilX === undefined
    ? 0
    : spring({ frame: frame - RECOIL_AT, fps, config: { damping: 11, stiffness: 120 } });

  const x = piece.x + piece.fromX * (1 - enter) + (piece.recoilX ?? 0) * recoil;
  const y = piece.y + piece.fromY * (1 - enter) + (piece.recoilY ?? 0) * recoil;
  // a small hand-placed wobble that changes every other frame
  const boil = (random(`${piece.id}-${frame}`) - 0.5) * 1.2;
  const rotate = piece.rotate * enter + boil + recoil * (piece.recoilX ?? 0) * 0.05;
  // the shadow lifts while the piece moves and settles when it lands
  const lift = interpolate(Math.abs(1 - enter) + recoil * (1 - recoil) * 2, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Img
      src={staticFile(piece.src)}
      style={{
        position: "absolute",
        width: piece.width,
        left: x - piece.width / 2,
        top: y,
        transform: `translateY(-50%) rotate(${rotate}deg) scaleX(${piece.flip ? -1 : 1})`,
        filter: `drop-shadow(${6 + lift * 10}px ${10 + lift * 18}px ${10 + lift * 14}px rgba(60, 30, 0, ${0.28 - lift * 0.08}))`,
      }}
    />
  );
};

export const HoneyFortress: React.FC = () => {
  const frame = useCurrentFrame();
  const onTwos = frame - (frame % 2);

  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND, overflow: "hidden" }}>
      {/* uncoated paper grain */}
      <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.22, mixBlendMode: "multiply" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed={3} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      {PIECES.map((piece) => (
        <PaperPiece key={piece.id} piece={piece} frame={onTwos} />
      ))}
    </AbsoluteFill>
  );
};
