"use client";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading ...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }
  return <>{children}</>;
};

export default ProtectedLayout;
