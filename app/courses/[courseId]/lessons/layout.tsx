"use client";
import { ReactNode } from "react";
import { LessonsProvider } from "@/contexts/LessonsContext";

export type LessonsLayoutProps = {
  children: ReactNode;
};

const LessonsLayout = ({ children }: LessonsLayoutProps) => {
  return <LessonsProvider>{children}</LessonsProvider>;
};

export default LessonsLayout;
