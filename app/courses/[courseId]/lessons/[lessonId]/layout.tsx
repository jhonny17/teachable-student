"use client";
import { useMemo } from "react";

import { PageHeader } from "@usefedora/ui";

import { NavBar } from "@/components/NavBar";
import { Sidebar } from "@/components/Sidebar";
import { useCourseContext } from "@/contexts/CourseContext";

import { RouteParams } from "./types";

import cl from "./layout.module.scss";

type LecturePageLayoutProps = {
  params: RouteParams;
  children: React.ReactNode;
};

const LecturePageLayout = ({ children, params }: LecturePageLayoutProps) => {
  const { lessonId } = params;
  const { lectureIds, lectureSections } = useCourseContext();

  const lessonName = useMemo(() => {
    const lectureId = Number(lessonId);
    const currentLectureSection = lectureSections.find((section) =>
      section.lectures.some((lecture) => lecture.id === lectureId)
    );

    if (!currentLectureSection) return "New Lesson";

    const currentLesson = currentLectureSection.lectures.find(
      (lecture) => lecture.id === lectureId
    );

    return currentLesson?.name ?? "New Lesson";
  }, [lessonId, lectureSections]);

  return (
    <div className={cl.lessonLayout}>
      <NavBar
        params={params}
        courseProgress={67}
        lectureIds={lectureIds}
        lessonTitle={"Rinocerontes voladores"}
        className={cl.navbarLessonLayout}
      />
      <aside className={cl.asideLessonLayout}>
        <Sidebar
          params={params}
          lectureSections={lectureSections}
          lectureIds={lectureIds}
        />
      </aside>
      <main className={cl.contentLessonLayout}>
        <PageHeader
          title={lessonName}
          level={1}
          sidebarToggle
          className={cl.lessonHeader}
        />
        {children}
      </main>
    </div>
  );
};

export default LecturePageLayout;
