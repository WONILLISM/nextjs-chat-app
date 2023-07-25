import React, { ReactNode } from "react";

interface AboutLayoutProps {
  children: ReactNode;
}

const AboutLayout = ({ children }: AboutLayoutProps) => {
  return (
    <div>
      AboutLayout
      {children}
    </div>
  );
};

export default AboutLayout;
