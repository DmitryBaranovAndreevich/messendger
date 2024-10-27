import { Block } from "./block";
import { TProps } from "./block-types";

export function render(query: string, block: Block<Record<string, TProps>>) {
  const root = document.querySelector(query);
  const node = block.getContent();

  if (node && root) {
    root.innerHTML = "";
    root.appendChild(node);
    block.dispatchComponentDidMount();
  }

  return root;
}
