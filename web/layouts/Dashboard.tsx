import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <h1>Dashboard Layout</h1>
      {children}
    </>
  );
};

export default DashboardLayout;
