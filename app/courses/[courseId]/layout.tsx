"use client";
import { ReactNode, useEffect } from "react";

import resetStyles from "@usefedora/ui/public/reset";
import commonStyles from "@usefedora/ui/public/common";
import tokensStyles from "@usefedora/uni/public/tokens";

import { CourseProvider } from "@/contexts/CourseContext";

import { RouteParams } from "./lessons/[lessonId]/types";

type CourseLayoutProps = {
  params: RouteParams;
  children: ReactNode;
};

function injectStyles(css: string): void {
  const style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

const CourseLayout = ({ params, children }: CourseLayoutProps) => {
  const { courseId } = params;

  useEffect(() => {
    injectStyles(resetStyles);
    injectStyles(commonStyles);
    injectStyles(tokensStyles);
  }, []);

  return <CourseProvider courseId={courseId}>{children}</CourseProvider>;
};

export default CourseLayout;
