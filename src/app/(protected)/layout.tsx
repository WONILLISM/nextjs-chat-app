"use client";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { status } = useUser();
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
