import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border border-emerald-100 p-4">
      <SignIn path="/login" routing="path" signUpUrl="/register" />
    </div>
  );
}
