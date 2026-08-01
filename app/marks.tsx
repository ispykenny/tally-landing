export function LogoGlyph({
  className,
  mono = false,
}: {
  className?: string;
  mono?: boolean;
}) {
  const trunk = mono ? "currentColor" : "#5E9678";
  const branch = mono ? "currentColor" : "#DFF3E8";
  return (
    <svg viewBox="0 0 1024 1024" className={className} fill="none" aria-hidden>
      <path d="M351 801 L351 174" stroke={trunk} strokeWidth="54" strokeLinecap="round" />
      <circle cx="351" cy="801" r="81" fill={trunk} />
      <circle cx="351" cy="174" r="81" fill={trunk} />
      <path
        d="M351 622 C351 532, 673 577, 673 487 L673 337"
        stroke={branch}
        strokeWidth="45"
        strokeLinecap="round"
      />
      <circle cx="673" cy="228" r="65" stroke={branch} strokeWidth="45" />
    </svg>
  );
}

export function AppMark({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[22.5%] bg-[#123328] ${className ?? ""}`}
    >
      <LogoGlyph className="h-[70%] w-[70%]" />
    </span>
  );
}
