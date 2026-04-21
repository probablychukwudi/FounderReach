import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

const SCENE_DURATIONS = [120, 150, 145, 145, 145, 145, 150, 150] as const;
export const FOUNDERREACH_DEMO_DURATION = SCENE_DURATIONS.reduce((total, duration) => total + duration, 0);
const SCENE_OFFSETS = SCENE_DURATIONS.map((_, index) =>
  SCENE_DURATIONS.slice(0, index).reduce((total, duration) => total + duration, 0),
);

const colors = {
  cream: "#f3f0ea",
  creamAlt: "#ede8de",
  ink: "#0f1311",
  muted: "#6b6660",
  green: "#00a651",
  greenBright: "#4ade80",
  sage: "#bccabb",
  dark: "#0d1110",
  card: "#101513",
  cardText: "#f2f0ec",
};

const assets = {
  logo: staticFile("assets/brand/founderreach-logo-mark.png"),
  dashboardPreview: staticFile("assets/figma/landing/dashboard-preview.png"),
  matchCard: staticFile("assets/figma/dashboard/match-card.png"),
  qualifyCard: staticFile("assets/figma/dashboard/qualify-alt.png"),
  outreachCard: staticFile("assets/figma/dashboard/outreach-card.png"),
  bookCard: staticFile("assets/figma/dashboard/book-card.png"),
  avatarProfile: staticFile("assets/figma/dashboard/avatar-profile.png"),
  avatarVoxel: staticFile("assets/figma/dashboard/avatar-voxel.png"),
  audio: staticFile("assets/demo/founderreach-demo-voice.mp3"),
};

const cardSceneMeta = [
  {
    eyebrow: "MATCH",
    title: "Scan live, messy websites",
    body: "TinyFish-powered agents index active labs, grants, and investors across the open web.",
    image: assets.matchCard,
    accent: "Millions of source signals",
  },
  {
    eyebrow: "QUALIFY",
    title: "Rank by relevance and recency",
    body: "FounderReach scores strategic fit, funding freshness, and collaboration potential before anyone sees a lead.",
    image: assets.qualifyCard,
    accent: "Only the strongest opportunities survive",
  },
  {
    eyebrow: "OUTREACH",
    title: "Draft personalized outbound",
    body: "The platform prepares specific, context-rich outreach with approvals built into the workflow.",
    image: assets.outreachCard,
    accent: "Every draft keeps the reasoning trail attached",
  },
  {
    eyebrow: "BOOK",
    title: "Turn replies into meetings",
    body: "Once a conversation is warm, FounderReach hands the thread into scheduling and calendar operations.",
    image: assets.bookCard,
    accent: "From signal to booked call in one system",
  },
];

const containerStyle: React.CSSProperties = {
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
  overflow: "hidden",
  fontFamily: "Inter, sans-serif",
};

const gradientOrb = (color: string, x: number, y: number, size: number): React.CSSProperties => ({
  position: "absolute",
  left: x,
  top: y,
  width: size,
  height: size,
  borderRadius: size,
  background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 68%)`,
  filter: "blur(4px)",
  opacity: 0.85,
});

const Eyebrow: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark = false }) => (
  <div
    style={{
      color: dark ? colors.greenBright : colors.green,
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const BrowserFrame: React.FC<{
  children: React.ReactNode;
  scale?: number;
  x?: number;
  y?: number;
}> = ({ children, scale = 1, x = 0, y = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: 680 + x,
      top: 126 + y,
      width: 500,
      height: 360,
      borderRadius: 28,
      background: "#f7f4ee",
      boxShadow: "0 24px 80px rgba(15,19,17,0.20)",
      overflow: "hidden",
      transform: `scale(${scale})`,
      transformOrigin: "center center",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 46,
        padding: "0 18px",
        background: "#e8e4da",
      }}
    >
      {["#ef4444", "#f59e0b", "#22c55e"].map((dot) => (
        <div
          key={dot}
          style={{
            width: 10,
            height: 10,
            borderRadius: 10,
            background: dot,
          }}
        />
      ))}
      <div
        style={{
          marginLeft: 8,
          flex: 1,
          height: 16,
          borderRadius: 999,
          background: "#f6f4ef",
          color: colors.muted,
          fontSize: 10,
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
        }}
      >
        founderreach.app/dashboard
      </div>
    </div>
    <div style={{ position: "relative", width: "100%", height: "calc(100% - 46px)" }}>{children}</div>
  </div>
);

const QuoteBar: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      bottom: 58,
      width: 700,
      minHeight: 98,
      padding: "24px 28px",
      borderRadius: 24,
      background: "rgba(255,255,255,0.88)",
      boxShadow: "0 16px 52px rgba(15,19,17,0.12)",
      color: colors.ink,
      fontSize: 28,
      lineHeight: 1.18,
      fontWeight: 600,
      letterSpacing: "-0.03em",
    }}
  >
    {text}
  </div>
);

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ fps, frame, config: { damping: 16, stiffness: 120 } });
  const fade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        ...containerStyle,
        background: colors.ink,
        color: colors.cardText,
      }}
    >
      <div style={gradientOrb("rgba(0,166,81,0.35)", -80, -40, 360)} />
      <div style={gradientOrb("rgba(74,222,128,0.22)", 920, 30, 260)} />
      <div style={gradientOrb("rgba(74,222,128,0.18)", 980, 470, 220)} />

      <div
        style={{
          position: "absolute",
          left: 72,
          top: 76,
          fontSize: 18,
          color: "rgba(242,240,236,0.7)",
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        FOUNDERREACH PRODUCT DEMO
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          top: 160,
          transform: `translateY(${32 - 32 * rise}px)`,
          opacity: fade,
        }}
      >
        <Eyebrow dark>Autonomous partnership intelligence</Eyebrow>
        <div
          style={{
            marginTop: 18,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 102,
            lineHeight: 0.95,
            letterSpacing: "-0.06em",
          }}
        >
          FounderReach
        </div>
        <div
          style={{
            marginTop: 28,
            maxWidth: 720,
            fontSize: 34,
            lineHeight: 1.18,
            color: "rgba(242,240,236,0.88)",
            letterSpacing: "-0.03em",
          }}
        >
          From live web research to qualified outreach and booked meetings.
        </div>
      </div>

      <Img
        src={assets.logo}
        style={{
          position: "absolute",
          right: 98,
          top: 174,
          width: 170,
          height: 170,
          opacity: fade,
          transform: `translateY(${20 - 20 * rise}px) scale(${0.92 + 0.08 * rise})`,
          filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.22))",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 58,
          height: 4,
          borderRadius: 999,
          background: "rgba(255,255,255,0.10)",
        }}
      >
        <div
          style={{
            width: `${interpolate(frame, [0, SCENE_DURATIONS[0]], [0, 100], {
              extrapolateRight: "clamp",
            })}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, #00a651 0%, #4ade80 100%)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const SceneOverview: React.FC = () => {
  const frame = useCurrentFrame();
  const move = spring({ fps: VIDEO_FPS, frame, config: { damping: 18, stiffness: 110 } });
  const previewScale = interpolate(move, [0, 1], [1.08, 1]);
  const previewX = interpolate(frame, [0, SCENE_DURATIONS[1]], [-26, 18]);

  return (
    <AbsoluteFill style={{ ...containerStyle, background: colors.cream }}>
      <div style={gradientOrb("rgba(74,222,128,0.16)", -90, 30, 280)} />
      <div style={gradientOrb("rgba(0,166,81,0.14)", 960, 380, 280)} />

      <div style={{ position: "absolute", left: 72, top: 92, width: 510 }}>
        <Eyebrow>One input. One stateful workflow.</Eyebrow>
        <div
          style={{
            marginTop: 20,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 62,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: colors.ink,
          }}
        >
          Describe your startup once.
        </div>
        <div
          style={{
            marginTop: 24,
            color: colors.muted,
            fontSize: 26,
            lineHeight: 1.26,
            letterSpacing: "-0.03em",
          }}
        >
          FounderReach launches a TinyFish-powered system that scans live, messy websites and routes every lead through match, qualify, outreach, and booking.
        </div>
      </div>

      <BrowserFrame scale={1.02} x={0} y={0}>
        <Img
          src={assets.dashboardPreview}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `translateX(${previewX}px) scale(${previewScale})`,
          }}
        />
      </BrowserFrame>

      <QuoteBar text="The dashboard keeps the whole pipeline visible, with the active stage moving into focus as work advances." />
    </AbsoluteFill>
  );
};

const SceneCard: React.FC<(typeof cardSceneMeta)[number]> = ({ eyebrow, title, body, image, accent }) => {
  const frame = useCurrentFrame();
  const lift = spring({ fps: VIDEO_FPS, frame, config: { damping: 16, stiffness: 120 } });
  const imageScale = interpolate(lift, [0, 1], [0.92, 1]);
  const imageY = interpolate(lift, [0, 1], [24, 0]);

  return (
    <AbsoluteFill style={{ ...containerStyle, background: colors.cream }}>
      <div style={gradientOrb("rgba(0,166,81,0.12)", 840, -30, 260)} />
      <div style={gradientOrb("rgba(74,222,128,0.14)", -110, 380, 300)} />

      <div style={{ position: "absolute", left: 72, top: 84, width: 430 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <div
          style={{
            marginTop: 18,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 58,
            lineHeight: 1.02,
            letterSpacing: "-0.05em",
            color: colors.ink,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 24,
            lineHeight: 1.3,
            color: colors.muted,
            letterSpacing: "-0.03em",
          }}
        >
          {body}
        </div>
        <div
          style={{
            marginTop: 34,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            borderRadius: 999,
            background: "rgba(0,166,81,0.12)",
            padding: "12px 18px",
            color: colors.green,
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              width: 10,
              height: 10,
              borderRadius: 10,
              background: colors.green,
              boxShadow: "0 0 18px rgba(0,166,81,0.55)",
            }}
          />
          {accent}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 72,
          top: 84,
          width: 620,
          height: 552,
          borderRadius: 32,
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 28px 80px rgba(15,19,17,0.18)",
          transform: `translateY(${imageY}px) scale(${imageScale})`,
        }}
      >
        <Img src={image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </AbsoluteFill>
  );
};

const SceneWorkflow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cards = [
    { src: assets.matchCard, left: 100, top: 170 },
    { src: assets.qualifyCard, left: 385, top: 110 },
    { src: assets.outreachCard, left: 670, top: 170 },
    { src: assets.bookCard, left: 955, top: 110 },
  ];

  return (
    <AbsoluteFill style={{ ...containerStyle, background: colors.ink, color: colors.cardText }}>
      <div style={gradientOrb("rgba(0,166,81,0.32)", 40, 420, 260)} />
      <div style={gradientOrb("rgba(74,222,128,0.20)", 860, -40, 300)} />

      <div style={{ position: "absolute", left: 72, top: 72, right: 72 }}>
        <Eyebrow dark>Observable orchestration</Eyebrow>
        <div
          style={{
            marginTop: 18,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 54,
            lineHeight: 1.02,
            letterSpacing: "-0.05em",
          }}
        >
          Each agent hands the run forward.
        </div>
      </div>

      {cards.map((card, index) => {
        const local = Math.max(frame - index * 10, 0);
        const enter = spring({ fps, frame: local, config: { damping: 15, stiffness: 110 } });
        return (
          <div
            key={card.src}
            style={{
              position: "absolute",
              left: card.left,
              top: card.top,
              width: 225,
              height: 330,
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
              transform: `translateY(${32 - 32 * enter}px) scale(${0.92 + 0.08 * enter})`,
              opacity: interpolate(local, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <Img src={card.src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        );
      })}

      {[0, 1, 2].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: 308 + index * 285,
            top: 274 - (index % 2) * 60,
            width: 54,
            height: 2,
            background: "linear-gradient(90deg, rgba(188,202,187,0.25) 0%, rgba(74,222,128,0.85) 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -4,
              top: -4,
              width: 10,
              height: 10,
              borderTop: "2px solid rgba(74,222,128,0.85)",
              borderRight: "2px solid rgba(74,222,128,0.85)",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 70,
          width: 620,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <Img
          src={assets.avatarVoxel}
          style={{
            width: 74,
            height: 74,
            borderRadius: 999,
            objectFit: "cover",
            border: "2px solid rgba(255,255,255,0.12)",
          }}
        />
        <Img
          src={assets.avatarProfile}
          style={{
            width: 74,
            height: 74,
            borderRadius: 999,
            objectFit: "cover",
            border: "2px solid rgba(255,255,255,0.12)",
            marginLeft: -24,
          }}
        />
        <div style={{ fontSize: 24, lineHeight: 1.25, color: "rgba(242,240,236,0.82)" }}>
          Human approvals stay in the loop, while the system keeps momentum moving across every stage.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ fps, frame, config: { damping: 15, stiffness: 110 } });

  return (
    <AbsoluteFill style={{ ...containerStyle, background: colors.cream }}>
      <div style={gradientOrb("rgba(0,166,81,0.15)", -60, 20, 280)} />
      <div style={gradientOrb("rgba(74,222,128,0.18)", 980, 360, 260)} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${20 - 20 * rise}px)`,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <Img
          src={assets.logo}
          style={{
            width: 132,
            height: 132,
            objectFit: "contain",
            filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.12))",
          }}
        />
        <div
          style={{
            marginTop: 24,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 88,
            lineHeight: 0.98,
            letterSpacing: "-0.06em",
            color: colors.ink,
          }}
        >
          FounderReach
        </div>
        <div
          style={{
            marginTop: 22,
            maxWidth: 900,
            textAlign: "center",
            color: colors.muted,
            fontSize: 28,
            lineHeight: 1.25,
            letterSpacing: "-0.03em",
          }}
        >
          Run live startup research, approve smarter outreach, and book the right meetings faster.
        </div>
        <div
          style={{
            marginTop: 36,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            borderRadius: 999,
            background: "linear-gradient(135deg, #006d36 0%, #4ade80 100%)",
            padding: "16px 24px",
            color: "white",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            boxShadow: "0 24px 50px rgba(0,109,54,0.2)",
          }}
        >
          founderreach.app
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const FounderReachDemoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={containerStyle}>
      <Audio src={assets.audio} />

      <Sequence from={SCENE_OFFSETS[0]} durationInFrames={SCENE_DURATIONS[0]}>
        <SceneIntro />
      </Sequence>

      <Sequence from={SCENE_OFFSETS[1]} durationInFrames={SCENE_DURATIONS[1]}>
        <SceneOverview />
      </Sequence>

      {cardSceneMeta.map((scene, index) => (
        <Sequence
          key={scene.eyebrow}
          from={SCENE_OFFSETS[index + 2]}
          durationInFrames={SCENE_DURATIONS[index + 2]}
        >
          <SceneCard {...scene} />
        </Sequence>
      ))}

      <Sequence from={SCENE_OFFSETS[6]} durationInFrames={SCENE_DURATIONS[6]}>
        <SceneWorkflow />
      </Sequence>

      <Sequence from={SCENE_OFFSETS[7]} durationInFrames={SCENE_DURATIONS[7]}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
