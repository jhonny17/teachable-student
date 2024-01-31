"use client";

export const getCookie = (name: string): string => {
  const nameLenPlus = name.length + 1;
  debugger;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.slice(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.slice(nameLenPlus));
      })[0] || ""
  );
};
