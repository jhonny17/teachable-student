"use client";
import { useEffect, useState } from "react";

import resetStyles from "@usefedora/ui/public/reset";
import commonStyles from "@usefedora/ui/public/common";
import tokensStyles from "@usefedora/uni/public/tokens";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";

import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/Sidebar";
import { LectureSection, RouteParams } from "./types";

import cl from "./layout.module.scss";

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
  const { courseId } = params;
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

  return (
    <div className={cl.lessonLayout}>
      <NavBar
        params={params}
        courseProgress={50}
        lectureIds={lectureIds}
        lessonTitle="New Lesson"
        className={cl.navbarLessonLayout}
      />
      <aside className={cl.asideLessonLayout}>
        <Sidebar
          params={params}
          lectureSections={lectureSections}
          lectureIds={lectureIds}
        />
      </aside>
      <main className={cl.contentLessonLayout}>{children}</main>
    </div>
  );
};

export default LecturePageLayout;
