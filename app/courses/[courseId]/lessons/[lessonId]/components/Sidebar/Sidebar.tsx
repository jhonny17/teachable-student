import { useEffect, useState } from "react";

import { List } from "@usefedora/ui";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";
import { usePrevious } from "@/hooks/usePrevious";
import { useEventListener } from "@/hooks/useEventListener";

import { LectureSection, RouteParams } from "../../types";

import { LectureSectionItem } from "../LectureSectionItem";
import cl from "./Sidebar.module.scss";
import { useRouter } from "next/navigation";

export type SidebarProps = {
  params: RouteParams;
};

export const Sidebar = ({ params }: SidebarProps) => {
  const router = useRouter();

  const { courseId, lessonId } = params;
  const previousCourseId = usePrevious(courseId);
  const [lectureIds, setLecturesIds] = useState<number[]>([]);
  const [lectureSections, setLectureSections] = useState<LectureSection[]>([]);

  const getCourseLectures = async (courseId: string) => {
    const lectureSections = await api<LectureSection>(
      `${FEDORA_HOST}/api/v1/courses/${courseId}/lecture_sections`
    );

    return lectureSections;
  };

  const saveLectureIds = (lectureSections: LectureSection[]) => {
    const ids = lectureSections.reduce((acc, section) => {
      const lectureIds = section.lectures.map((lecture) => lecture.id);
      return [...acc, ...lectureIds];
    }, [] as number[]);

    setLecturesIds(ids);
  };

  useEffect(() => {
    if (courseId === previousCourseId) return;
    getCourseLectures(courseId).then(({ lecture_sections }) => {
      saveLectureIds(lecture_sections);
      setLectureSections(lecture_sections);
    });
  }, [courseId, previousCourseId]);

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
