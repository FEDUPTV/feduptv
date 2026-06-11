"use client";

import { FormEvent, useEffect, useState } from "react";

export default function PortalGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.removeItem("fedup_portal_access");

    fetch("/api/portal/session")
      .then((response) => response.json())
      .then((data) => setAllowed(Boolean(data.authenticated)))
      .finally(() => setChecking(false));
  }, []);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/portal/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setAllowed(true);
      setPassword("");
    } else {
      setError("Incorrect password.");
    }
  }

  if (allowed) return <>{children}</>;

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
        <p className="text-gray-400">Checking portal access...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <form
        onSubmit={unlock}
        className="w-full max-w-md rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8"
      >
        <h1 className="mb-4 text-3xl font-black text-yellow-500">FEDUP Portal</h1>
        <p className="mb-6 text-gray-400">Enter portal password.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-black p-4"
          placeholder="Password"
        />
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-xl bg-yellow-500 py-4 font-black text-black"
        >
          Unlock Portal
        </button>
      </form>
    </main>
  );
}
