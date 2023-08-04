"use client";
import React, { ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  // if (status === "loading") {
  //   return <div>Loading ...</div>;
  // }

  return (
    <>
      <button onClick={() => signOut()}>signout</button> {children}
    </>
  );
};

export default ProtectedLayout;
