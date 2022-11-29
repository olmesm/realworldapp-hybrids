import { define, html } from "hybrids";

const tag = "hello-world";

type Component = {};

define<Component>({
  tag,
  render: () => html`<h1>Hello World</h1>`,
});
