"use client";
import { useRef, useEffect } from "react";

export type EventListenerName = keyof WindowEventMap;

export type EventListenerHandler<K extends EventListenerName> = (
  this: Window,
  ev: WindowEventMap[K]
) => unknown;

export const useEventListener = <K extends EventListenerName>(
  eventName: K,
  handler: EventListenerHandler<K>,
  element: Window = window
): void => {
  const savedHandler = useRef<EventListenerHandler<K>>();

  useEffect(() => {
    savedHandler.current = handler.bind(element);
  }, [handler, element]);

  useEffect(() => {
    const isSupported = element.addEventListener;
    if (!isSupported) return () => null;

    const eventListener = (event: WindowEventMap[K]) =>
      savedHandler.current?.apply(window, [event]);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
