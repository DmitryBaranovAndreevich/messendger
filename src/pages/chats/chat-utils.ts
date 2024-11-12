export function escapeSymbols(string: string) {
  const HTML_ESC = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  } as const;

  return string.replace(/[&<>"']/g, function (match) {
    return HTML_ESC[match as keyof typeof HTML_ESC];
  });
}
