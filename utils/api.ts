"use server";

import { getCookie } from "./cookie";

type ApiParamsType = Parameters<typeof fetch>;

export const api = <T>(url: ApiParamsType[0], params?: ApiParamsType[1]) => {
  const csrfToken = decodeURIComponent(getCookie("admin_csrf_token"));
  console.log({ csrfToken });
  return fetch(url, params).then((res) => res.json() as T);
};
