import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Homeopatie Petra — Ing. Petra Cihlářová, Praha 2";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f7f3ec 0%, #e8ecdf 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            fontSize: 20,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#6b7257",
          }}
        >
          Ing. Petra Cihlářová
        </div>
        <div style={{ fontSize: 92, color: "#2e3b2a", textAlign: "center", lineHeight: 1.1 }}>
          Homeopatie Petra
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            color: "#8a7b5c",
            fontStyle: "italic",
          }}
        >
          Léčba, která vidí celého člověka
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            fontSize: 22,
            color: "#6b7257",
          }}
        >
          Praha 2 — Nové Město · homeopatie-praha.com
        </div>
      </div>
    ),
    { ...size }
  );
}
