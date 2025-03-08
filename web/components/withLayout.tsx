import HomeLayout from "@/layouts/Home";
import DefaultLayout from "@/layouts/Default";
import { Layouts } from "@/types/layouts";
import type { FC, PropsWithChildren } from "react";

const layouts: Record<Layouts, FC<PropsWithChildren<{}>>> = {
  home: HomeLayout,
  page: DefaultLayout,
  login: DefaultLayout,
  signup: DefaultLayout,
};

type WithLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>;

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout] ?? DefaultLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default WithLayout;
