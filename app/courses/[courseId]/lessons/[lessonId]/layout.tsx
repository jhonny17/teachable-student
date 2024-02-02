"use client";
import cx from "classnames";
import { useEffect, useMemo, useState } from "react";

import resetStyles from "@usefedora/ui/public/reset";
import commonStyles from "@usefedora/ui/public/common";
import tokensStyles from "@usefedora/uni/public/tokens";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";

import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/Sidebar";
import { LectureSection, RouteParams } from "./types";

import cl from "./layout.module.scss";
import { PageHeader } from "@usefedora/ui";

type LecturePageLayoutProps = {
  params: RouteParams;
  children: React.ReactNode;
};

function injectStyles(css: string): void {
  const style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

const LecturePageLayout = ({ children, params }: LecturePageLayoutProps) => {
  const { courseId, lessonId } = params;
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
    getCourseLectures(courseId).then(({ lecture_sections }) => {
      saveLectureIds(lecture_sections);
      setLectureSections(lecture_sections);
    });
  }, [courseId]);

  useEffect(() => {
    injectStyles(resetStyles);
    injectStyles(commonStyles);
    injectStyles(tokensStyles);
  }, []);

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
        lessonTitle={lessonName}
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
