import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Tally — GitHub pull requests in your menu bar";
// Rendered at 2x the classic 1200x630 for crisp text on retina displays;
// the JSX below stays in 1200x630 coordinates via a scale(2) wrapper.
export const size = { width: 2400, height: 1260 };
export const contentType = "image/png";

function Logo({ box, glyph }: { box: number; glyph: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: box,
        height: box,
        borderRadius: box * 0.24,
        backgroundColor: "#123328",
      }}
    >
      <svg viewBox="0 0 1024 1024" width={glyph} height={glyph} fill="none">
        <path d="M351 801 L351 174" stroke="#5E9678" strokeWidth="54" strokeLinecap="round" />
        <circle cx="351" cy="801" r="81" fill="#5E9678" />
        <circle cx="351" cy="174" r="81" fill="#5E9678" />
        <path
          d="M351 622 C351 532, 673 577, 673 487 L673 337"
          stroke="#DFF3E8"
          strokeWidth="45"
          strokeLinecap="round"
        />
        <circle cx="673" cy="228" r="65" stroke="#DFF3E8" strokeWidth="45" />
      </svg>
    </div>
  );
}

export default async function OgImage() {
  // The popover is a real screenshot of the app preview on the site — the same
  // rendering the demo video ends on — so it always matches the product.
  const [wallpaper, popover] = await Promise.all([
    readFile(join(process.cwd(), "public/wallpaper.jpg")),
    readFile(join(process.cwd(), "public/og-popover.jpg")),
  ]);
  const wallpaperSrc = `data:image/jpeg;base64,${wallpaper.toString("base64")}`;
  const popoverSrc = `data:image/jpeg;base64,${popover.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#2a2a8f",
        }}
      >
        <div
          style={{
            width: 1200,
            height: 630,
            display: "flex",
            transform: "scale(2)",
            transformOrigin: "top left",
          }}
        >
          <img
            src={wallpaperSrc}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              objectFit: "cover",
            }}
          />
          {/* left: branding */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: 660,
              paddingLeft: 80,
              paddingRight: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Logo box={92} glyph={64} />
              <div
                style={{
                  fontSize: 76,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                }}
              >
                Tally
              </div>
            </div>
            <div
              style={{
                marginTop: 40,
                fontSize: 46,
                fontWeight: 600,
                lineHeight: 1.15,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              Pull requests, at a glance.
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 26,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              GitHub PRs in your Mac&rsquo;s menu bar
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 26,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              Free &amp; open source
            </div>
          </div>

          {/* right: the real popover, bleeding off the bottom */}
          <div style={{ display: "flex", flex: 1, paddingTop: 48 }}>
            <img
              src={popoverSrc}
              alt=""
              width={440}
              height={643}
              style={{
                width: 440,
                height: 643,
                borderRadius: 34,
                boxShadow: "0 40px 90px rgba(10,10,60,0.5)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
