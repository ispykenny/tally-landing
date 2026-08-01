import { HeroDemo } from "./demo";
import { AppMark } from "./marks";
import { Reveal } from "./reveal";

const RELEASE_URL =
  "https://github.com/ispykenny/tally/releases/latest/download/Tally.dmg";
const REPO_URL = "https://github.com/ispykenny/tally";

const FEATURES = [
  {
    title: "Lives in your menu bar.",
    body: "No dock icon, no window to manage. The badge shows your open PR count, and the full list is one click away — built natively with SwiftUI.",
  },
  {
    title: "Know the moment a PR opens.",
    body: "Tally checks GitHub every 60 seconds and posts a native macOS notification when a new pull request appears. Click it to jump straight to the PR.",
  },
  {
    title: "Follow the repos you care about.",
    body: "Search GitHub by name or exact owner/repo and subscribe with one click. PRs are grouped by repository, with checks, comments, and draft status inline.",
  },
  {
    title: "Private by design.",
    body: "Sign in with a personal access token stored in the macOS Keychain. Tally talks only to the GitHub API — no servers, no accounts, no analytics.",
  },
  {
    title: "No notification spam.",
    body: "Subscribing to a busy repo won't blast you. Existing PRs seed silently, and you're only notified about pull requests opened afterwards.",
  },
  {
    title: "Keeps itself up to date.",
    body: "Signed, notarized, and updated over the air. New versions arrive automatically — no reinstalling.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Download and open",
    body: "Grab the latest release, drop Tally in Applications, and it appears in your menu bar.",
  },
  {
    step: "02",
    title: "Paste a GitHub token",
    body: "Create a token with the repo scope — fine-grained works too. It never leaves your Keychain.",
  },
  {
    step: "03",
    title: "Subscribe to repos",
    body: "Search any repository and subscribe. The count shows up in your menu bar immediately.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-[#1d1d1f]">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 text-[15px]">
          <a href="#" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
            <AppMark className="h-8 w-8" />
            Tally
          </a>
          <div className="flex items-center gap-6 font-semibold text-[#424245]">
            <a href={REPO_URL} className="transition-colors hover:text-black">
              GitHub
            </a>
            <a
              href={RELEASE_URL}
              className="rounded-full bg-[#1d1d1f] px-4 py-1.5 text-white transition-colors hover:bg-black"
            >
              Download
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* hero */}
        <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-24 pb-16 text-center sm:pt-32">
          <h1 className="rise rise-1 font-display text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-[80px] sm:leading-[1.03]">
            Pull requests,
            <br />
            <span className="bg-gradient-to-r from-[#123328] via-[#2c6e52] to-[#5E9678] bg-clip-text text-transparent">
              at a glance.
            </span>
          </h1>
          <p className="rise rise-2 mt-6 max-w-xl text-pretty text-xl leading-8 text-[#6e6e73] sm:text-2xl sm:leading-9">
            Tally lives in your Mac&rsquo;s menu bar and tells you the moment a
            new PR opens in the repos you care about.
          </p>
          <div className="rise rise-3 mt-9 flex items-center gap-6">
            <a
              href={RELEASE_URL}
              className="rounded-full bg-[#123328] px-6 py-3 text-[17px] font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#1e4a38]"
            >
              Download for macOS
            </a>
          </div>
          <p className="rise rise-4 mt-5 text-sm text-[#86868b]">
            Free and open source. Requires macOS 26.
          </p>
        </section>

        {/* live demo */}
        <section aria-label="App preview" className="mx-auto w-full max-w-5xl px-6 pb-28">
          <Reveal>
            <HeroDemo />
          </Reveal>
        </section>

        {/* features */}
        <section className="bg-[#f5f5f7] py-28">
          <div className="mx-auto w-full max-w-5xl px-6">
            <Reveal>
              <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Built to stay
                <br />
                out of your way.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 100}>
                  <div className="h-full rounded-[24px] bg-white p-8 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
                    <h3 className="font-display text-xl font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-3 leading-7 text-[#6e6e73]">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* how it works */}
        <section className="py-28">
          <div className="mx-auto w-full max-w-5xl px-6">
            <Reveal>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Up and running
                <br />
                in a minute.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-12 sm:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.step} delay={i * 120}>
                  <span className="text-sm font-semibold text-[#2c6e52]">{s.step}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 leading-7 text-[#6e6e73]">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* final CTA */}
        <section className="border-t border-black/5 py-28 text-center">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6">
            <Reveal>
              <AppMark className="h-16 w-16" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-8 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
                Stop refreshing
                <br />
                the PR tab.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-md text-xl leading-8 text-[#6e6e73]">
                Put your team&rsquo;s pull requests where you&rsquo;ll actually
                see them.
              </p>
              <a
                href={RELEASE_URL}
                className="mt-9 inline-block rounded-full bg-[#123328] px-6 py-3 text-[17px] font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#1e4a38]"
              >
                Download Tally
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#f5f5f7]">
        <div className="mx-auto flex w-full max-w-5xl flex-col justify-between gap-2 px-6 py-6 text-xs text-[#86868b] sm:flex-row">
          <span>
            Tally — built by{" "}
            <a href="https://github.com/ispykenny" className="hover:underline">
              @ispykenny
            </a>
          </span>
          <span>Free · Open source · macOS</span>
        </div>
      </footer>
    </div>
  );
}
