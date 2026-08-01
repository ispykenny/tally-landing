"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AppMark, LogoGlyph } from "./marks";

function CheckBadge({ count, muted }: { count: number; muted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium ${muted ? "text-zinc-400" : "text-emerald-600"}`}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.36 5.65a.75.75 0 0 0-1.06 0L7.1 8.85 5.7 7.45a.75.75 0 1 0-1.06 1.06l1.93 1.93c.3.3.77.3 1.06 0l3.73-3.73a.75.75 0 0 0 0-1.06Z" />
      </svg>
      {count}
    </span>
  );
}

function CommentBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v7a1.5 1.5 0 0 1-1.5 1.5H8.06l-2.87 2.53A.75.75 0 0 1 4 14v-2H2.5A1.5 1.5 0 0 1 1 10.5v-7Z" />
      </svg>
      {count}
    </span>
  );
}

const avatarUrl = (id: string) =>
  `https://images.unsplash.com/${id}?w=80&h=80&fit=crop&crop=faces&auto=format`;

type PrRow = {
  title: string;
  meta: string;
  avatar: string;
  checks: number;
  checksMuted?: boolean;
  comments: number;
  draft?: boolean;
  approved?: boolean;
};

const NEW_PR: PrRow = {
  title: "APP-1209: Add dark mode to the settings pane",
  meta: "#314 by priya-nair · just now",
  avatar: avatarUrl("photo-1567532939604-b6b5b0db2604"),
  checks: 0,
  checksMuted: true,
  comments: 0,
};

const PR_ROWS: PrRow[] = [
  {
    title: "APP-1204: Remember filter selection between sessions",
    meta: "#312 by mia-tanaka · 2 hours ago",
    avatar: avatarUrl("photo-1573497019940-1c28c88b4f3e"),
    checks: 2,
    comments: 2,
    approved: true,
  },
  {
    title: "APP-1198: Bring tablet layout to parity and fix sticky header overlap",
    meta: "#310 by sam-porter · 3 hours ago",
    avatar: avatarUrl("photo-1552058544-f2b08422138a"),
    checks: 0,
    checksMuted: true,
    comments: 1,
    draft: true,
  },
  {
    title: "APP-1187: Support GIF uploads",
    meta: "#305 by dev-okafor · 4 hours ago",
    avatar: avatarUrl("photo-1544723795-3fb6469f5b39"),
    checks: 2,
    comments: 1,
  },
  {
    title: "APP-1183: Fix onboarding banner spacing and logo fallback",
    meta: "#301 by lena-fischer · 6 hours ago",
    avatar: avatarUrl("photo-1619895862022-09114b41f16f"),
    checks: 1,
    comments: 3,
  },
];

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3 w-3 shrink-0 text-zinc-500 ${open ? "rotate-90" : ""}`}
      fill="none"
      aria-hidden
    >
      <path
        d="m6 3.5 4.5 4.5L6 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RepoIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 text-zinc-600" fill="none" aria-hidden>
      <path
        d="M4.75 1.75h8.5v12.5h-8.5a1.75 1.75 0 0 1-1.75-1.75V3.5a1.75 1.75 0 0 1 1.75-1.75Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M3 11.5h10.25" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 text-zinc-500 ${className ?? ""}`}
      fill="none"
      aria-hidden
    >
      <path
        d="M1.5 8S4 3.75 8 3.75 14.5 8 14.5 8 12 12.25 8 12.25 1.5 8 1.5 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PrCard({ pr, highlight }: { pr: PrRow; highlight?: boolean }) {
  return (
    <div
      className={`relative flex gap-3 rounded-2xl p-3 transition-colors duration-1000 ${
        highlight
          ? "bg-emerald-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
          : "bg-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
      }`}
    >
      <Image
        src={pr.avatar}
        alt=""
        width={40}
        height={40}
        className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="truncate pr-6 text-[13px] font-semibold leading-5 text-zinc-900">
          {pr.title}
        </p>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-zinc-500">
          <span>{pr.meta}</span>
          <CheckBadge count={pr.checks} muted={pr.checksMuted} />
          <CommentBadge count={pr.comments} />
          {pr.draft && (
            <span className="rounded-md bg-black/10 px-1.5 py-0.5 font-medium text-zinc-600">
              Draft
            </span>
          )}
        </div>
      </div>
      <span className="absolute right-3 top-3 text-zinc-400">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
          <path
            d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {pr.approved && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M8 0l1.9 1.2 2.2-.3 1 2 2 1-.3 2.2L16 8l-1.2 1.9.3 2.2-2 1-1 2-2.2-.3L8 16l-1.9-1.2-2.2.3-1-2-2-1 .3-2.2L0 8l1.2-1.9L.9 3.9l2-1 1-2 2.2.3L8 0Zm3.1 5.6a.75.75 0 0 0-1.06 0L7.1 8.5 5.96 7.36A.75.75 0 1 0 4.9 8.42l1.67 1.67c.3.3.77.3 1.06 0l3.47-3.47a.75.75 0 0 0 0-1.06Z" />
          </svg>
        </span>
      )}
    </div>
  );
}

export function HeroDemo() {
  // 0 = menu bar only, 1 = popover open + rows cascading, 2 = new PR lands
  const [stage, setStage] = useState(0);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timers.push(
        setTimeout(() => {
          setStage(3);
          setCount(21);
        }, 0),
      );
    } else {
      // count the badge up 0 → 20 while the popover opens
      timers.push(
        setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / 1100, 1);
            setCount(Math.round(20 * (1 - Math.pow(1 - t, 3))));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, 350),
      );
      timers.push(setTimeout(() => setStage(1), 550));
      // a new PR arrives: notification slides in, row expands, badge ticks to 21
      timers.push(
        setTimeout(() => {
          setStage(2);
          setCount(21);
        }, 3400),
      );
      // the notification auto-dismisses like a real macOS banner
      timers.push(setTimeout(() => setStage(3), 7600));
    }

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  const open = stage >= 1;

  return (
    <div className="font-system relative overflow-hidden rounded-[28px] bg-[#2a2a8f] pb-12 shadow-[0_24px_80px_rgba(30,30,110,0.35)]">
      {/* macOS wallpaper */}
      <Image
        src="/wallpaper.jpg"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 976px"
        className="pointer-events-none object-cover"
        priority
      />

      {/* menu bar */}
      <div className="relative flex items-center border-b border-white/10 bg-white/10 px-4 py-1.5 text-[13px] text-white backdrop-blur-md sm:px-5">
        <span className="font-semibold">Finder</span>
        <span className="ml-4 hidden gap-4 font-normal text-white/85 sm:flex">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
        </span>
        <div className="ml-auto flex items-center gap-3 sm:gap-3.5">
          {/* Tally status item — the popover anchors to this */}
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold tabular-nums transition-colors duration-300 ${
              open ? "bg-white/25" : "bg-transparent"
            }`}
          >
            <LogoGlyph mono className="h-3.5 w-3.5" />
            {count}
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-300/30">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            11 local
          </span>
          {/* bluetooth */}
          <svg viewBox="0 0 16 16" className="hidden h-4 w-4 sm:block" fill="none" aria-hidden>
            <path
              d="M4.5 5 11 11l-3.5 3V2L11 5l-6.5 6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          {/* battery */}
          <span className="flex items-center gap-1.5">
            56%
            <svg viewBox="0 0 26 13" className="h-3.5 w-7" fill="none" aria-hidden>
              <rect x="0.75" y="0.75" width="21" height="11.5" rx="3" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
              <rect x="2.5" y="2.5" width="10.5" height="8" rx="1.5" fill="currentColor" />
              <path d="M24 4.5v4c1.2-.3 2-1 2-2s-.8-1.7-2-2Z" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </span>
          {/* wifi */}
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
            <path
              d="M1.5 6a10 10 0 0 1 13 0M3.75 8.75a6.5 6.5 0 0 1 8.5 0M6 11.5a3 3 0 0 1 4 0"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="8" cy="13.5" r="1" fill="currentColor" />
          </svg>
          <span className="whitespace-nowrap">Thu 9:41 PM</span>
        </div>
      </div>

      {/* macOS notification — slides in over the popover, then auto-dismisses */}
      <div
        aria-hidden={stage !== 2}
        className={`absolute right-3 top-10 z-20 w-80 max-w-[calc(100%-2rem)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          stage === 2 ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+2rem)] opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-2xl bg-white/60 p-3.5 shadow-[0_18px_44px_rgba(10,10,60,0.4),inset_0_1px_1px_rgba(255,255,255,0.7)] backdrop-blur-2xl backdrop-saturate-200">
          <AppMark className="h-9 w-9 shrink-0" />
          <div className="min-w-0 text-[12px] leading-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-zinc-900">Tally</span>
              <span className="shrink-0 text-zinc-400">now</span>
            </div>
            <p className="mt-0.5 font-medium text-zinc-800">New PR in oakline/checkout-web</p>
            <p className="truncate text-zinc-500">{NEW_PR.title}</p>
          </div>
        </div>
      </div>

      {/* popover — anchored directly beneath the Tally status item */}
      <div className="relative mt-1.5 flex justify-center px-4 sm:justify-end sm:pr-5">
        <div
          className={`w-full max-w-105 origin-top rounded-4xl bg-white/55 shadow-[0_25px_60px_rgba(10,10,60,0.35),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_0_0_1px_rgba(255,255,255,0.3)] backdrop-blur-2xl backdrop-saturate-200 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            open ? "scale-100 opacity-100" : "scale-[0.92] opacity-0 -translate-y-3"
          }`}
        >
          {/* header */}
          <div className="flex items-center gap-3 rounded-t-4xl bg-white/25 px-5 py-4">
            <AppMark className="h-11 w-11" />
            <div className="flex-1">
              <div className="text-[15px] font-semibold text-zinc-900">Tally</div>
              <div className="text-[12px] text-zinc-500">@ispykenny</div>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/50 text-zinc-600">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M13.65 2.35A8 8 0 1 0 16 8h-1.5A6.5 6.5 0 1 1 12.6 3.4L10 6h6V0l-2.35 2.35Z" />
              </svg>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/50 text-zinc-600">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm7 3.35v-.7l-1.6-.55a5.7 5.7 0 0 0-.4-.97l.74-1.52-.5-.5-.5-.5-1.52.74a5.7 5.7 0 0 0-.97-.4L9.7 1.35h-.7L8.45 3a5.7 5.7 0 0 0-.97.4L5.96 2.61l-1 1 .74 1.52a5.7 5.7 0 0 0-.4.97L3.7 6.65v.7l1.6.55c.1.34.23.66.4.97L4.96 10.4l1 1 1.52-.74c.3.17.63.3.97.4l.55 1.6h.7l.55-1.6c.34-.1.66-.23.97-.4l1.52.74 1-1-.74-1.52c.17-.3.3-.63.4-.97l1.6-.56Z" />
              </svg>
            </span>
          </div>

          {/* filter chips */}
          <div className="flex gap-2 px-5 pt-4">
            <span className="flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1.5 text-[12px] font-medium text-zinc-700">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                <path d="M5.5 6.5h5M5.5 9.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Status
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1.5 text-[12px] font-medium text-zinc-700">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                <circle cx="8" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="1.4" />
                <path d="M3 13.5c.8-2.3 2.7-3.5 5-3.5s4.2 1.2 5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Author
            </span>
          </div>

          {/* collapsed repo */}
          <div className="flex items-center gap-2 px-5 pt-4 pb-1 text-[13px] font-medium text-zinc-800">
            <Chevron />
            <RepoIcon />
            <span className="truncate">oakline/mobile-app</span>
            <EyeIcon className="ml-auto" />
            <span className="min-w-7 rounded-full bg-white/50 px-2 py-0.5 text-center text-[12px] font-semibold tabular-nums leading-4 text-zinc-600">
              0
            </span>
          </div>

          {/* expanded repo */}
          <div className="flex items-center gap-2 px-5 pt-2 pb-2 text-[13px] font-medium text-zinc-800">
            <Chevron open />
            <RepoIcon />
            <span className="truncate">oakline/checkout-web</span>
            <EyeIcon className="ml-auto" />
            <span className="min-w-7 rounded-full bg-white/50 px-2 py-0.5 text-center text-[12px] font-semibold tabular-nums leading-4 text-zinc-600">
              {stage >= 2 ? 21 : 20}
            </span>
          </div>

          <ul className="px-4 pb-3">
            {/* the newly arrived PR expands into place */}
            <li
              className={`grid transition-all duration-600 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                stage >= 2 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-2">
                  <PrCard pr={NEW_PR} highlight />
                </div>
              </div>
            </li>
            {PR_ROWS.map((pr, i) => (
              <li
                key={pr.meta}
                style={{ transitionDelay: open ? `${200 + i * 110}ms` : "0ms" }}
                className={`pb-2 transition-all duration-600 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <PrCard pr={pr} />
              </li>
            ))}
          </ul>

          <div className="rounded-b-4xl px-5 pb-4 pt-1 text-[12px] text-zinc-500">
            {stage >= 2 ? "Updated just now" : "Updated now"}
          </div>
        </div>
      </div>
    </div>
  );
}
