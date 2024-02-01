import Link from "next/link";
import { useEffect, useState } from "react";

import { Heading, List, ListElement } from "@usefedora/ui";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";
import { usePrevious } from "@/hooks/usePrevious";

import { LectureSection, RouteParams } from "../../types";

import cl from "./Sidebar.module.scss";

export type SidebarProps = {
  params: RouteParams;
};

export const getCourseLectures = async (courseId: string) => {
  const lectureSections = await api<LectureSection>(
    `${FEDORA_HOST}/api/v1/courses/${courseId}/lecture_sections`
  );
  console.count("requests");
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

export const Sidebar = ({ params }: SidebarProps) => {
  const { courseId } = params;
  const previousCourseId = usePrevious(courseId);
  const [lectureSections, setLectureSections] = useState<LectureSection[]>([]);

  useEffect(() => {
    if (courseId === previousCourseId) return;
    getCourseLectures(courseId).then(({ lecture_sections }) =>
      setLectureSections(lecture_sections)
    );
  }, [courseId, previousCourseId]);

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
