import { Component, define, router } from "hybrids";

export type RouteComponent<T> = { component: Component<T>; routes: string[] };

export const defineRoute = <T>({ routes, component }: RouteComponent<T>) =>
  routes.map((url, i) =>
    define({
      ...component,
      tag: component.tag + i,
      [router.connect]: {
        url,
      },
    })
  );
