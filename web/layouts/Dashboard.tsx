import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
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
    </main>
  );
};

export default DashboardLayout;
