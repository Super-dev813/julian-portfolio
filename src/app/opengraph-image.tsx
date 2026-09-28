import { DATA } from "@/data/resume";
import { loadSerif } from "@/lib/og-fonts";
import { ImageResponse } from "next/og";

export const alt = `${DATA.name} — ${DATA.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const serif = await loadSerif();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0b0e14",
          color: "#ece6da",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: "0.2em", color: "#c9a96e", textTransform: "uppercase" }}>
          {DATA.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 128, lineHeight: 1 }}>{DATA.name}</div>
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.4, color: "#9098a6", maxWidth: 900 }}>
            {DATA.description}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#9098a6" }}>
          {DATA.location} · {DATA.workMode}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, weight: 400, style: "normal" }] }
  );
}
