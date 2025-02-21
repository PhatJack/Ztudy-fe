import React from "react";
import { Toaster } from "react-hot-toast";
const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default DefaultLayout;
