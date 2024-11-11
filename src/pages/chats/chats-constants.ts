export function getDataStr(d: string | number) {
  const date = new Date(d ? d : Date.now());
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${h} : ${m}`;
}
