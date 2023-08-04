import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <article className="flex items-center justify-center min-h-screen p-4 mx-auto">
      <div className="flex flex-col items-center justify-center min-w-[360px] gap-6 p-4 bg-white rounded-lg shadow-lg">
        {children}
      </div>
    </article>
  );
};

export default layout;
