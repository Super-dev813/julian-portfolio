import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// A single gold node on ink, echoing the request trace in the hero.
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
          borderRadius: 14,
          backgroundColor: "#0b0e14",
        }}
      >
        <div style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: "#c9a96e", boxShadow: "0 0 0 7px rgba(201,169,110,0.22)" }} />
      </div>
    ),
    size
  );
}
