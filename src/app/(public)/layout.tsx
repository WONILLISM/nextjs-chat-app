"use client";
import Image from "next/image";
import React, { ReactNode } from "react";

import authImg from "../../../public/auth_img.jpeg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { status } = useSession();
  const router = useRouter();

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  if (status === "authenticated") {
    router.push("/chat");
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="relative flex max-w-4xl shadow-2xl rounded-3xl h-[70vh] max-h-[960px] min-h-[560px]">
        <article className="z-10 flex flex-col items-center justify-between w-96 rounded-3xl">
          <div className="pt-12 text-4xl font-bold tracking-wide text-white">
            CHAT APP
          </div>
          <div className="flex flex-col items-center p-8 mb-10 bg-white rounded-3xl bg-opacity-30">
            {children}
          </div>
        </article>
        <Image
          className="rounded-3xl"
          src={authImg}
          alt="auth image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </section>
  );
};

export default PublicLayout;
