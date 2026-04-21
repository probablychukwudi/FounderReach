import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2d4e68, #599bce)",
          borderRadius: 18,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 999,
            background: "#4ade80",
            boxShadow: "0 0 20px rgba(74, 222, 128, 0.7)",
          }}
        />
      </div>
    ),
    size,
  );
}
