"use server";

import { getCookie } from "./cookie";

type ApiParamsType = Parameters<typeof fetch>;

export const api = <T>(url: ApiParamsType[0], params?: ApiParamsType[1]) => {
  return fetch(url, params).then((res) => res.json() as T);
};
