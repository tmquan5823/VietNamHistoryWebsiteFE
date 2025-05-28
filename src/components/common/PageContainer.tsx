import React from "react";

type PageContainerProps = {
  title?: string;
  info?: string;
  children: React.ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  info,
  children,
}) => (
  <div className="min-h-screen bg-white flex flex-col items-center py-6 px-2 max-w-7xl mx-auto">
    {title && (
      <h1 className="text-3xl text-[#5D4037] font-bold text-center mb-2">
        {title}
      </h1>
    )}
    <p className="text-neutral-600 text-center mb-6 max-w-xl">{info}</p>
    {children}
  </div>
);

export default PageContainer;
