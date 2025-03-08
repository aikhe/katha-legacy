import type { FC, PropsWithChildren } from "react";

import { Layouts } from "@/types/layouts";
import HomeLayout from "@/layouts/Home";
import DefaultLayout from "@/layouts/Default";
import DashboardLayout from "@/layouts/Dashboard";
import MainLayout from "@/layouts/Main";
import ProfileLayout from "@/layouts/ProfileLayout";
import CategoriesLayout from "@/layouts/Categories";

const layouts: Record<Layouts, FC<PropsWithChildren<{}>>> = {
  home: HomeLayout,
  auth: DefaultLayout,
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
