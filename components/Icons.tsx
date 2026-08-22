type P = { className?: string };

/**
 * GetHired mark: a checkmark whose upstroke keeps rising into an arrowhead.
 * Reads as "approved" and "moving up" at once — which is the whole product.
 */
export function LogoMark({ className = "h-8 w-8" }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--color-brand-deep)" />
      <path
        d="M7.4 14.6 13.2 20.4 23.4 9.6"
        fill="none"
        stroke="var(--color-brand-mid)"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9 9.6h3.5v3.5"
        fill="none"
        stroke="var(--color-brand-mid)"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: P) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8" />
      <span className="font-display text-[20px] leading-none tracking-[-0.04em]">
        <span className="font-semibold text-muted">get</span>
        <span className="font-extrabold text-brand-deep">hired</span>
      </span>
    </span>
  );
}

/**
 * `draw` animates the tick on with a stroke-dashoffset sweep, matching the
 * reference site's `.checkmark-check` (0.8s ease-out, 0.4s delay, forwards).
 */
export function Check({ className = "h-4 w-4", draw = false }: P & { draw?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
      <path
        className={draw ? "check-draw" : undefined}
        d="m4.5 10.5 3.6 3.6L15.5 6.7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dash({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
      <path d="M6 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Chevron({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
      <path
        d="m6 8 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Persona / module glyphs. Line-art, one visual family. */
const GLYPHS: Record<string, React.ReactNode> = {
  profile: (
    <>
      <circle cx="12" cy="8.5" r="3.4" />
      <path d="M4.8 20.2c.7-3.7 3.7-5.7 7.2-5.7s6.5 2 7.2 5.7" />
    </>
  ),
  analysis: (
    <>
      <path d="M4 20V9.5M10 20V4.5M16 20v-7M22 20H3" />
    </>
  ),
  resume: (
    <>
      <path d="M6 3.5h8.5L19 8v12.5H6z" />
      <path d="M14 3.5V8h5M9 12.5h7M9 16h5" />
    </>
  ),
  practice: (
    <>
      <path d="M12 3.5a3 3 0 0 1 3 3V12a3 3 0 0 1-6 0V6.5a3 3 0 0 1 3-3Z" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
    </>
  ),
  hire: (
    <>
      <path d="M4 7.5h16v13H4zM8.5 7.5V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2.5" />
      <path d="M4 13h16" />
    </>
  ),
  experience: (
    <>
      <path d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6z" />
      <path d="M12 12v8.8M4 7.6l8 4.4 8-4.4" />
    </>
  ),
  learner: (
    <>
      <path d="M12 4 22 9l-10 5L2 9z" />
      <path d="M6.5 11.2V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4.8" />
    </>
  ),
  jobseeker: (
    <>
      <path d="M3.5 8h17v12h-17z" />
      <path d="M8.5 8V5.8A1.8 1.8 0 0 1 10.3 4h3.4a1.8 1.8 0 0 1 1.8 1.8V8" />
      <path d="M3.5 13h17" />
    </>
  ),
  switcher: (
    <>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </>
  ),
  interview: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M9 10.5h.01M12.5 10.5h.01M16 10.5h.01" />
    </>
  ),
  free: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v9M7.5 12h9" />
    </>
  ),
};

export function Glyph({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[name] ?? GLYPHS.free}
    </svg>
  );
}
