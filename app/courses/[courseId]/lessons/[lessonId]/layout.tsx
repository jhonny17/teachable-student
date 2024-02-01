"use client";
import { useEffect, useState } from "react";

import resetStyles from "@usefedora/ui/public/reset";
import commonStyles from "@usefedora/ui/public/common";
import tokensStyles from "@usefedora/uni/public/tokens";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";

import { LectureSection, RouteParams } from "./types";

import cl from "./layout.module.scss";
import { Heading, List, ListElement } from "@usefedora/ui";

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

export const getCourseLectures = async (courseId: string) => {
  const lectureSections = await api<LectureSection>(
    `${FEDORA_HOST}/api/v1/courses/${courseId}/lecture_sections`
  );

  return lectureSections;
};

const LectureSectionItem = ({ section }: { section: LectureSection }) => {
  const { name, lectures } = section;
  return (
    <>
      <Heading level={3}>{name}</Heading>
      {lectures.map((lecture) => (
        <ListElement key={lecture.id}>{lecture.name}</ListElement>
      ))}
    </>
  );
};

const LecturePageLayout = ({ children, params }: LecturePageLayoutProps) => {
  const { courseId } = params;
  const [lectureSections, setLectureSections] = useState<LectureSection[]>([]);

  useEffect(() => {
    injectStyles(resetStyles);
    injectStyles(commonStyles);
    injectStyles(tokensStyles);
  }, []);

  useEffect(() => {
    getCourseLectures(courseId).then(({ lecture_sections }) =>
      setLectureSections(lecture_sections)
    );
  }, [courseId]);

  return (
    <div className={cl.lessonLayout}>
      <nav className={cl.navbarLessonLayout}>navbar</nav>
      <aside className={cl.asideLessonLayout}>
        <List className={cl.lessonList}>
          {lectureSections.map((section) => (
            <LectureSectionItem key={section.id} section={section} />
          ))}
        </List>
      </aside>
      <main className={cl.contentLessonLayout}>{children}</main>
    </div>
  );
};

export default LecturePageLayout;
