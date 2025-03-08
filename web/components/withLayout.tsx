import type { FC, PropsWithChildren } from "react";

import { Layouts } from "@/types/layouts";
import DefaultLayout from "@/layouts/Default";
import HomeLayout from "@/layouts/Home";
import AuthLayout from "@/layouts/Auth";
import DashboardLayout from "@/layouts/Dashboard";

const layouts: Record<Layouts, FC<PropsWithChildren<{}>>> = {
  home: HomeLayout,
  auth: AuthLayout,
  dashboard: DashboardLayout,
};

type WithLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>;

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout] ?? DefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default WithLayout;
