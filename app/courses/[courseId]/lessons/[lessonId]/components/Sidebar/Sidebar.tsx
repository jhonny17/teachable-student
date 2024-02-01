import { useRouter } from "next/navigation";

import { List } from "@usefedora/ui";

import { useEventListener } from "@/hooks/useEventListener";

import { LectureSection, RouteParams } from "../../types";
import { LectureSectionItem } from "../LectureSectionItem";
import cl from "./Sidebar.module.scss";

export type SidebarProps = {
  params: RouteParams;
  lectureIds: number[];
  lectureSections: LectureSection[];
};

export const Sidebar = ({
  params,
  lectureSections,
  lectureIds,
}: SidebarProps) => {
  const router = useRouter();
  const { courseId, lessonId } = params;

  const goToPreviousLecture = () => {
    const currentLectureIndex = lectureIds.indexOf(Number(lessonId));
    const previousLectureId = lectureIds[currentLectureIndex - 1];
    if (!previousLectureId) return;
    router.push(`/courses/${courseId}/lessons/${previousLectureId}`);
  };

  const goToNextLecture = () => {
    const currentLectureIndex = lectureIds.indexOf(Number(lessonId));
    const nextLectureId = lectureIds[currentLectureIndex + 1];
    if (!nextLectureId) return;
    router.push(`/courses/${courseId}/lessons/${nextLectureId}`);
  };

  const trackKeyCourseChanger = (event: KeyboardEvent) => {
    if (lectureIds.length <= 0) return;

    if (event.altKey && event.key === "ArrowUp") {
      goToPreviousLecture();
      return;
    }

    if (event.altKey && event.key === "ArrowDown") {
      goToNextLecture();
      return;
    }
  };

  useEventListener("keydown", trackKeyCourseChanger);

  return (
    <List className={cl.sidebar}>
      {lectureSections.map((section) => (
        <LectureSectionItem
          key={section.id}
          section={section}
          params={params}
        />
      ))}
    </List>
  );
};
