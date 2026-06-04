"use client";

import { useEffect, useState } from "react";

export default function PortalGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("fedup_portal_access") === "yes") {
      setAllowed(true);
    }
  }, []);

  function unlock() {
    const correct = process.env.NEXT_PUBLIC_PORTAL_PASSWORD || "FedUp2026!";
    if (password === correct) {
      localStorage.setItem("fedup_portal_access", "yes");
      setAllowed(true);
    } else {
      alert("Incorrect password.");
    }
  }

  if (allowed) return <>{children}</>;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8">
        <h1 className="mb-4 text-3xl font-black text-yellow-500">FED UP Portal</h1>
        <p className="mb-6 text-gray-400">Enter portal password.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-black p-4"
          placeholder="Password"
        />
        <button onClick={unlock} className="w-full rounded-xl bg-yellow-500 py-4 font-black text-black">
          Unlock Portal
        </button>
      </div>
    </main>
  );
}
