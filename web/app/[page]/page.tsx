import { FC } from "react";

import { dynamicRouter } from "@/next.dynamic.mjs";

import WithLayout from "@/components/withLayout";

import { Layouts } from "@/types/layouts";
import { notFound } from "next/navigation";

type DynamicStaticPaths = { path: Array<string>; page: string };
type DynamicParams = { params: Promise<DynamicStaticPaths> };

const pages = ["home", "auth", "profile", "dashboard"];
const dashboardPaths = ["main", "analytics", "setting", "profile"];
const authPaths = ["signup", "login"];
const categories = ["category1", "category2", "category3"];

const Home: FC<DynamicParams> = async (params) => {
  const { path = [], page } = await params.params;

  const pathname = dynamicRouter.getPathname(path);

  console.log(page);
  console.log(pathname);

  if (pages.includes(page)) {
    if (pathname && !dashboardPaths.includes(pathname)) {
      return notFound();
    }

    if (page !== "dashboard" && dashboardPaths.includes(pathname)) {
      return notFound();
    } else if (page === "dashboard" && dashboardPaths.includes(pathname)) {
      return <WithLayout layout={pathname as Layouts}></WithLayout>;
    }

    return <WithLayout layout={page as Layouts}></WithLayout>;
  }

  return notFound();
};

export default Home;
