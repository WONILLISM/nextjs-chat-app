import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <section className="bg-slate-200 min-h-screen flex items-center justify-center">
      <article className="p-5 w-96 bg-white rounded-3xl flex flex-col items-center shadow-md">
        <div className="text-6xl">CHAT APP</div>
        {children}
      </article>
    </section>
  );
};

export default AuthLayout;
