import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <h1>Dashboard Layout</h1>
      <ul>
        <li>
          <a href="/dashboard/main">Main</a>
        </li>
        <li>
          <a href="/dashboard/profile">Profile</a>
        </li>
      </ul>
      {children}
    </>
  );
};

export default DashboardLayout;
