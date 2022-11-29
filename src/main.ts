import { define, html, router } from "hybrids";
import { defineRoute, RouteComponent } from "./utils/define-route";

import.meta.glob("./components/*.ts", { eager: true });
const pages: Record<string, RouteComponent<unknown>> = import.meta.glob(
  "./pages/*.ts",
  {
    eager: true,
  }
);

const routes = Object.values(pages).flatMap(defineRoute);

define<{ views: HTMLElement[] }>({
  tag: "h-app",
  views: router(routes),
  content: ({ views }) => html`
    <h-nav></h-nav>
    ${views}
    <h-footer></h-footer>
  `,
});
