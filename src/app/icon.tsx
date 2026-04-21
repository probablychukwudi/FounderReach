import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  const icon = readFileSync(
    path.join(process.cwd(), "public/assets/brand/founderreach-logo-mark.svg"),
    "utf8",
  );
  const encodedIcon = Buffer.from(icon).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;base64,${encodedIcon}`}
          alt="FounderReach"
          width={54}
          height={58}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    size,
  );
}
