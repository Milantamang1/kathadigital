"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Login failed. Please try again.");
      return;
    }

    window.location.replace(searchParams.get("next") ?? "/admin");
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#09090b] px-5 text-[#f4f4f5] overflow-hidden">
      {/* Soft gold ambient glow background */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#272730] bg-[#121217]/95 p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all hover:border-amber-500/30">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.28em] text-amber-400">
            Admin Access
          </div>
          <h1 className="mt-3 font-display text-4xl font-light text-zinc-100">Katha Digital CMS</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Sign in with your admin email and password to manage the studio dashboard.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-300">Email</span>
            <span className="flex items-center gap-3 rounded-xl border border-[#272730] bg-[#181820] px-4 py-3 focus-within:border-amber-500/70 focus-within:ring-1 focus-within:ring-amber-500/30 transition-all">
              <Mail className="size-4 text-amber-400" />
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
                placeholder="admin@kathadigital.com"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-300">Password</span>
            <span className="flex items-center gap-3 rounded-xl border border-[#272730] bg-[#181820] px-4 py-3 focus-within:border-amber-500/70 focus-within:ring-1 focus-within:ring-amber-500/30 transition-all">
              <Lock className="size-4 text-amber-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
                placeholder="Enter admin password"
              />
              <button
                type="button"
                className="text-amber-400 transition hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </span>
          </label>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 px-5 py-3 text-sm font-bold text-black shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
