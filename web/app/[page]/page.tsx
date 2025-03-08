import { FC } from "react";
import { notFound } from "next/navigation";

import { DYNAMIC_ROUTES } from "@/next.dynamic.constants.mjs";
import { dynamicRouter } from "@/next.dynamic.mjs";

import WithLayout from "@/components/withLayout";

import { Layouts } from "@/types/layouts";

type DynamicStaticPaths = { path: Array<string>; page: string };
type DynamicParams = { params: Promise<DynamicStaticPaths> };

const getPage: FC<DynamicParams> = async (props) => {
  const { path = [], page } = await props.params;

  const pathname = dynamicRouter.getPathname(path);
  const fullPath = path.length > 0 ? `${page}/${pathname}` : page;

  console.log(fullPath);

  const staticGeneratedLayout = DYNAMIC_ROUTES.get(fullPath);

  if (staticGeneratedLayout !== undefined) {
    return <WithLayout layout={staticGeneratedLayout as Layouts} />;
  }

  const { Component, layout } = await dynamicRouter.getPageFile(fullPath);

  if (Component && layout) {
    return (
      <WithLayout layout={layout as Layouts}>
        <Component />
      </WithLayout>
    );
  }

  return notFound();
};

export const dynamic = "force-static";
export const revalidate = 300;

export default getPage;
