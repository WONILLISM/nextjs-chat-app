"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Login = () => {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <button className="bg-blue-200" onClick={() => signIn("google")}>
        signin with Google
      </button>
      <button className="bg-red-200" onClick={() => signOut()}>
        sign out
      </button>
    </div>
  );
};

export default Login;
