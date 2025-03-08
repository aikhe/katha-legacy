import { FC } from "react";

import { dynamicRouter } from "@/next.dynamic.mjs";

import WithLayout from "@/components/withLayout";

import { Layouts } from "@/types/layouts";
import { notFound } from "next/navigation";

type DynamicStaticPaths = { path: Array<string>; page: string };
type DynamicParams = { params: Promise<DynamicStaticPaths> };

const availablePages = ["home", "dashboard", "page", "login", "signup"];
const availableDashboardPaths = ["main", "analytics", "setting", "profile"];

const Home: FC<DynamicParams> = async (params) => {
  const { path = [], page } = await params.params;

  const pathname = dynamicRouter.getPathname(path);

  console.log(page);

  if (availablePages.includes(page)) {
    if (pathname && !availableDashboardPaths.includes(pathname)) {
      return notFound();
    }

    if (page !== "dashboard" && availableDashboardPaths.includes(pathname)) {
      return notFound();
    }

    return <WithLayout layout={page as Layouts}></WithLayout>;
  }

  return notFound();
};

export default Home;
