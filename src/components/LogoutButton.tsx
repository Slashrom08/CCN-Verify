"use client";

export function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <button type="button" onClick={handleLogout} className="text-xs font-medium text-white/50 hover:text-indigo-300">
      Se déconnecter
    </button>
  );
}
