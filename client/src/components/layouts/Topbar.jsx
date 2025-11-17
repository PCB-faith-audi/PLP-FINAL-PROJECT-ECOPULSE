import React from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

export default function Topbar() {
  const { isSignedIn } = useUser();
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b bg-white dark:bg-neutral-900">
      <Link to="/" className="font-bold text-emerald-600">EcoPulse</Link>
      <div className="flex items-center gap-3">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link
            to="/sign-in"
            className="px-3 py-1 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}