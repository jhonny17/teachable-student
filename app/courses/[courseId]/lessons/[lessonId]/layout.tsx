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
import { useCourseContext } from "../../contexts/CourseContext";

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
  const { lessonId } = params;
  const { lectureIds, lectureSections } = useCourseContext();

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
