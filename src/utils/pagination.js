import _ from "lodash";

export function pagination(items, pageSize, currPage) {
  const startPage = (currPage - 1) * pageSize;
  return _(items).slice(startPage).take(pageSize).value();
}
