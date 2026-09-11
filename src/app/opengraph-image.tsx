import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.area.base}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(path.join(process.cwd(), "src/app/fonts", file));

export default async function OpenGraphImage() {
  const [archivo, barlow] = await Promise.all([
    font("ArchivoBlack-Regular.ttf"),
    font("BarlowCondensed-SemiBold.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#15181B",
          color: "#F6F3EE",
          padding: 64,
          fontFamily: "Archivo Black",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              background: "#F9B21D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#15181B",
              fontSize: 44,
            }}
          >
            G
          </div>
          <div style={{ fontFamily: "Barlow Condensed", fontSize: 30, letterSpacing: 7, color: "#F9B21D", textTransform: "uppercase" }}>{site.tagline}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 132, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>George&apos;s</div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 38, lineHeight: 1.1, textTransform: "uppercase", letterSpacing: -1, whiteSpace: "nowrap" }}>
            <div>Assembled. Mounted. Painted.</div>
            <div style={{ marginLeft: 16, background: "#F9B21D", color: "#15181B", padding: "2px 12px" }}>Done right.</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Barlow Condensed", fontSize: 32, letterSpacing: 2, textTransform: "uppercase", color: "#C9CDD2" }}>
          <div>{`${site.area.base} · ${site.area.radiusMiles}-mile radius · Free quotes`}</div>
          <div style={{ color: "#F9B21D" }}>{site.phone}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo Black", data: archivo, weight: 400, style: "normal" },
        { name: "Barlow Condensed", data: barlow, weight: 600, style: "normal" },
      ],
    },
  );
}
