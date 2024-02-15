"use client";
import { ReactNode } from "react";
import { CourseProvider } from "./contexts/CourseContext";
import { RouteParams } from "./lessons/[lessonId]/types";

type CourseLayoutProps = {
  params: RouteParams;
  children: ReactNode;
};

const CourseLayout = ({ params, children }: CourseLayoutProps) => {
  const { courseId } = params;
  return <CourseProvider courseId={courseId}>{children}</CourseProvider>;
};

export default CourseLayout;
