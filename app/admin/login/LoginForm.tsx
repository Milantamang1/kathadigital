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
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#f3efe5] px-5 text-[#17130d]">
      <div className="w-full max-w-md rounded-2xl border border-[#ddd6c8] bg-white p-8 shadow-[0_24px_80px_-48px_rgba(23,19,13,0.65)]">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.28em] text-[#c0912f]">
            Admin Access
          </div>
          <h1 className="mt-3 font-display text-4xl font-light">Katha Digital CMS</h1>
          <p className="mt-3 text-sm leading-6 text-[#766d61]">
            Sign in with your admin email and password to manage the studio dashboard.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#4f473d]">Email</span>
            <span className="flex items-center gap-3 rounded-xl border border-[#ddd6c8] bg-[#f7f4ec] px-4 py-3">
              <Mail className="size-4 text-[#c0912f]" />
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="admin@kathadigital.com"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#4f473d]">Password</span>
            <span className="flex items-center gap-3 rounded-xl border border-[#ddd6c8] bg-[#f7f4ec] px-4 py-3">
              <Lock className="size-4 text-[#c0912f]" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Enter admin password"
              />
              <button
                type="button"
                className="text-[#c0912f] transition hover:text-[#9f741f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c0912f]"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </span>
          </label>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#17130d] px-5 py-3 text-sm font-bold text-[#efbc4a] transition hover:bg-[#241f17] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
