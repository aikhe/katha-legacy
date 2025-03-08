import type { FC, PropsWithChildren } from "react";

import { Layouts } from "@/types/layouts";
import DefaultLayout from "@/layouts/Default";
import HomeLayout from "@/layouts/Home";
import AuthLayout from "@/layouts/Auth";
import DashboardLayout from "@/layouts/Dashboard";
import MainLayout from "@/layouts/Main";
import ProfileLayout from "@/layouts/ProfileLayout";
import CategoriesLayout from "@/layouts/Categories";

const layouts: Record<Layouts, FC<PropsWithChildren<{}>>> = {
  home: HomeLayout,
  auth: AuthLayout,
  dashboard: DashboardLayout,
  main: MainLayout,
  profile: ProfileLayout,
  categories: CategoriesLayout,
};

type WithLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>;

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout] ?? DefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default WithLayout;
