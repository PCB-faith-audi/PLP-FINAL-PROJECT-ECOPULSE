import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function Register() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border border-emerald-100 p-4">
      <SignUp path="/register" routing="path" signInUrl="/login" />
    </div>
  );
}
