"use server";

export const api = <T>(url: string | URL | Request, params?: RequestInit) => {
  const defaultHeaders = {
    Cookie: process.env.COOKIE,
    "x-csrf-token": process.env.X_CSRF_TOKEN,
  } as RequestInit["headers"];

  return fetch(url, {
    ...(params ?? {}),
    headers: {
      ...(defaultHeaders as unknown as RequestInit["headers"]),
      ...(params?.headers ?? {}),
    },
  }).then((res) => res.json() as T);
};
