"use client";

import React from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import googleLogo from "../../../../public/google_logo.png";

const Login = () => {
  const session = useSession();
  console.log(session);

  const handleSignInButtonClick = () => {
    signIn("google", { callbackUrl: "/chat" });
  };

  return (
    <div>
      <button
        className="flex items-center px-4 py-2 bg-white rounded-lg "
        onClick={handleSignInButtonClick}
      >
        <Image
          src={googleLogo}
          alt="google logo"
          objectFit="contain"
          width={24}
        />
        <div className="pl-2">Sign In with Google</div>
      </button>
    </div>
  );
};

export default Login;
