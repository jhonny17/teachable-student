"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import resetStyles from "@usefedora/ui/public/reset";
import commonStyles from "@usefedora/ui/public/common";
import tokensStyles from "@usefedora/uni/public/tokens";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";

import { LectureSection, RouteParams } from "./types";

import cl from "./layout.module.scss";
import { Heading, List, ListElement } from "@usefedora/ui";
import { usePrevious } from "@/hooks/usePrevious";

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

const LectureSectionItem = ({
  section,
  params,
}: {
  section: LectureSection;
  params: RouteParams;
}) => {
  const { name, lectures } = section;
  const { courseId, lessonId } = params;
  return (
    <>
      <Heading level={3}>{name}</Heading>
      {lectures.map(({ id, name, course_id }) => (
        <Link key={id} href={`/courses/${course_id}/lessons/${id}`}>
          <ListElement active={course_id === +courseId && id === +lessonId}>
            {name}
          </ListElement>
        </Link>
      ))}
    </>
  );
};

const LecturePageLayout = ({ children, params }: LecturePageLayoutProps) => {
  const { courseId, lessonId } = params;
  const previousCourseId = usePrevious(courseId);
  const [lectureSections, setLectureSections] = useState<LectureSection[]>([]);

  useEffect(() => {
    injectStyles(resetStyles);
    injectStyles(commonStyles);
    injectStyles(tokensStyles);
  }, []);

  useEffect(() => {
    if (courseId === previousCourseId) return;
    getCourseLectures(courseId).then(({ lecture_sections }) =>
      setLectureSections(lecture_sections)
    );
  }, [courseId, previousCourseId]);

  return (
    <div className={cl.lessonLayout}>
      <nav className={cl.navbarLessonLayout}>navbar</nav>
      <aside className={cl.asideLessonLayout}>
        <List className={cl.lessonList}>
          {lectureSections.map((section) => (
            <LectureSectionItem
              key={section.id}
              section={section}
              params={params}
            />
          ))}
        </List>
      </aside>
      <main className={cl.contentLessonLayout}>{children}</main>
    </div>
  );
};

export default LecturePageLayout;
