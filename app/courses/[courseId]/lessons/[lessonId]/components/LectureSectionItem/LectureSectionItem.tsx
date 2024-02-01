import Link from "next/link";
import { Heading, ListElement } from "@usefedora/ui";
import { LectureSection, RouteParams } from "../../types";

export const LectureSectionItem = ({
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
