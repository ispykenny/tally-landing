import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Tally — GitHub pull requests in your menu bar";
// Rendered at 2x the classic 1200x630 for crisp text on retina displays;
// the JSX below stays in 1200x630 coordinates via a scale(2) wrapper.
export const size = { width: 2400, height: 1260 };
export const contentType = "image/png";

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?w=160&h=160&fit=crop&crop=faces&auto=format`;

type OgRow = {
  title: string;
  meta: string;
  img: string;
  checks: string;
  comments: string;
  draft?: boolean;
  approved?: boolean;
};

const ROWS: OgRow[] = [
  {
    title: "APP-1209: Add dark mode to settings",
    meta: "#314 by priya-nair · just now",
    img: avatar("photo-1567532939604-b6b5b0db2604"),
    checks: "0",
    comments: "0",
  },
  {
    title: "APP-1204: Remember filter selection",
    meta: "#312 by mia-tanaka · 2 hours ago",
    img: avatar("photo-1573497019940-1c28c88b4f3e"),
    checks: "2",
    comments: "2",
    approved: true,
  },
  {
    title: "APP-1198: Bring tablet layout to parity",
    meta: "#310 by sam-porter · 3 hours ago",
    img: avatar("photo-1552058544-f2b08422138a"),
    checks: "0",
    comments: "1",
    draft: true,
  },
  {
    title: "APP-1187: Support GIF uploads",
    meta: "#305 by dev-okafor · 4 hours ago",
    img: avatar("photo-1544723795-3fb6469f5b39"),
    checks: "2",
    comments: "1",
  },
  {
    title: "APP-1183: Fix onboarding banner spacing",
    meta: "#301 by lena-fischer · 6 hours ago",
    img: avatar("photo-1619895862022-09114b41f16f"),
    checks: "1",
    comments: "3",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14">
      <path
        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.36 5.65a.75.75 0 0 0-1.06 0L7.1 8.85 5.7 7.45a.75.75 0 1 0-1.06 1.06l1.93 1.93c.3.3.77.3 1.06 0l3.73-3.73a.75.75 0 0 0 0-1.06Z"
        fill="#059669"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14">
      <path
        d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v7a1.5 1.5 0 0 1-1.5 1.5H8.06l-2.87 2.53A.75.75 0 0 1 4 14v-2H2.5A1.5 1.5 0 0 1 1 10.5v-7Z"
        fill="#a1a1aa"
      />
    </svg>
  );
}

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
  const wallpaper = await readFile(join(process.cwd(), "public/wallpaper.jpg"));
  const wallpaperSrc = `data:image/jpeg;base64,${wallpaper.toString("base64")}`;

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
        { }
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
            width: 640,
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

        {/* right: the app popover, bleeding off the bottom */}
        <div style={{ display: "flex", flex: 1, paddingTop: 56 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 440,
              height: 640,
              borderRadius: 36,
              backgroundColor: "#ffffff",
              boxShadow: "0 40px 90px rgba(10,10,60,0.5)",
            }}
          >
            {/* header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "20px 22px 14px",
              }}
            >
              <Logo box={44} glyph={30} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#18181b" }}>Tally</div>
                <div style={{ fontSize: 13, color: "#71717a" }}>@ispykenny</div>
              </div>
              <div style={{ display: "flex", flex: 1 }} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: "rgba(0,0,0,0.06)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width={15}
                  height={15}
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: "rgba(0,0,0,0.06)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width={15}
                  height={15}
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
            </div>

            {/* chips */}
            <div style={{ display: "flex", gap: 8, padding: "0 22px" }}>
              {["Status", "Author"].map((c) => (
                <div
                  key={c}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    borderRadius: 999,
                    backgroundColor: "rgba(0,0,0,0.05)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#3f3f46",
                  }}
                >
                  {c}
                </div>
              ))}
            </div>

            {/* repo row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 22px 8px",
                fontSize: 14,
                fontWeight: 600,
                color: "#27272a",
              }}
            >
              <div style={{ display: "flex", color: "#71717a", marginRight: 8 }}>⌄</div>
              oakline/checkout-web
              <div style={{ display: "flex", flex: 1 }} />
              <div
                style={{
                  display: "flex",
                  padding: "2px 10px",
                  borderRadius: 999,
                  backgroundColor: "rgba(0,0,0,0.05)",
                  fontSize: 13,
                  color: "#52525b",
                }}
              >
                20
              </div>
            </div>

            {/* PR rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "0 16px",
              }}
            >
              {ROWS.map((r) => (
                <div
                  key={r.meta}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: 12,
                    borderRadius: 16,
                    backgroundColor: "rgba(0,0,0,0.05)",
                  }}
                >
                  { }
                  <img
                    src={r.img}
                    alt=""
                    width={34}
                    height={34}
                    style={{ borderRadius: 17, objectFit: "cover" }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#18181b",
                      }}
                    >
                      {r.title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 4,
                        fontSize: 12,
                        color: "#71717a",
                      }}
                    >
                      <div style={{ display: "flex" }}>{r.meta}</div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          color: "#059669",
                          fontWeight: 600,
                        }}
                      >
                        <CheckIcon /> {r.checks}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <CommentIcon /> {r.comments}
                      </div>
                      {r.draft && (
                        <div
                          style={{
                            display: "flex",
                            padding: "1px 7px",
                            borderRadius: 6,
                            backgroundColor: "rgba(0,0,0,0.08)",
                            fontWeight: 600,
                            color: "#52525b",
                          }}
                        >
                          Draft
                        </div>
                      )}
                    </div>
                  </div>
                  {r.approved && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CheckIcon />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    ),
    size,
  );
}
