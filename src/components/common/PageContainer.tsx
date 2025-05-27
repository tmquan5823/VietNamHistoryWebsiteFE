import React from "react";

type PageContainerProps = {
  title: string;
  info: string;
  children: React.ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  info,
  children,
}) => (
  <div className="min-h-screen bg-white flex flex-col items-center py-6 px-2 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-center text-neutral-800 mb-2">
      {title}
    </h1>
    <p className="text-neutral-600 text-center mb-6 max-w-xl">{info}</p>
    {children}
  </div>
);

export default PageContainer;
