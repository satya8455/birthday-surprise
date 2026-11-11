import { ChevronDown } from "lucide-react";

export function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`relative z-10 flex min-h-[100svh] scroll-mt-0 flex-col items-center justify-center px-5 py-24 sm:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <header className="reveal mx-auto mb-14 max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-tight font-light sm:text-6xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </header>
  );
}

export function NextButton({ href, label }) {
  return (
    <a href={href} className="btn-soft reveal mt-16">
      {label}
      <ChevronDown className="h-4 w-4 animate-bounce" />
    </a>
  );
}
