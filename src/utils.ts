import Handlebars from "handlebars";

export function addTemplate(
  templateSelector: string,
  root: HTMLElement | null,
  params = {}
) {
  if (!root) {
    return;
  }

  const source =
    document.querySelector<HTMLScriptElement>(templateSelector)!.innerHTML;
  const template = Handlebars.compile(source)(params);

  root.innerHTML = template;
}
