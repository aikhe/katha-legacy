"use strict";

const getPathname = (path = []) => path.join("/");

const getDynamicRouter = async () => {
  return {
    getPathname,
  };
};

export const dynamicRouter = await getDynamicRouter();
