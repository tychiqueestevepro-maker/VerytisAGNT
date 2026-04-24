"use client";

import Link from "next/link";

interface DemoButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function DemoButton({
  label = "Book a demo",
  variant = "primary",
  className = "",
  icon,
  onClick,
}: DemoButtonProps) {
  const baseStyles: Record<string, string> = {
    primary:
      "inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-10 py-4 text-sm font-bold text-white backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/20 hover:border-white/30 active:scale-[0.98] group",
    secondary:
      "group inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-10 py-4 text-sm font-medium text-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:text-white active:scale-[0.98]",
    ghost:
      "inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-4 text-sm font-bold transition-all hover:bg-violet-400 hover:text-white group",
  };

  return (
    <Link
      href="/demo"
      onClick={onClick}
      className={`${baseStyles[variant]} ${className}`}
    >
      {label}
      {icon && <span className="ml-2">{icon}</span>}
    </Link>
  );
}
