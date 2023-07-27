"use client";

import { signIn, useSession } from "next-auth/react";

import React from "react";

const Login = () => {
  const session = useSession();
  console.log(session);

  const handleSignInButtonClick = () => {
    signIn("google", { callbackUrl: "/chat" });
  };

  return (
    <div className="pt-8">
      <button
        className="rounded-2xl bg-blue-700 text-white py-4 px-8"
        onClick={handleSignInButtonClick}
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;
