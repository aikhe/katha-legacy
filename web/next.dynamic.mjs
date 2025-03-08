"use strict";

const getPathname = (path = []) => path.join("/");

const getDynamicRouter = async () => {
  const _getPageFile = async (pathname = "") => {
    const componentPath = `@/_pages/${pathname}`;

    const layout = pathname.substring(0, pathname.indexOf("/"));

    console.log(componentPath);
    console.log(layout);
    console.log(pathname);

    try {
      const module = await import(componentPath);

      console.log(module.default);

      return { Component: module.default, layout: layout || pathname };
    } catch (error) {
      return { Component: null, layout: layout || pathname };
    }
  };

  const getPageFile = async (pathname = "") => {
    const { Component, layout } = await _getPageFile(pathname);

    return {
      layout,
      Component,
    };
  };

  return {
    getPathname,
    getPageFile,
  };
};

export const dynamicRouter = await getDynamicRouter();
