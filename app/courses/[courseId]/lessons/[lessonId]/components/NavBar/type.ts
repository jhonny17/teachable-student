import { RouteParams } from "@/app/courses/[courseId]/lessons/[lessonId]/types";

export type NavBarProps = {
  lessonTitle: string;
  courseProgress: number;
  className?: string;
  params: RouteParams;
  lectureIds: number[];
};
