"use client";
import cx from "classnames";
import { useRouter } from "next/navigation";

import { Button } from "@usefedora/ui";
import tc from "@usefedora/ui/public/type-modules";

import { NavBarProps } from "./type";
import cl from "./NavBar.module.scss";

export const NavBar = ({
  lessonTitle,
  courseProgress,
  className,
  lectureIds,
  params: { courseId, lessonId },
}: NavBarProps) => {
  const router = useRouter();

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

  return (
    <nav className={cx(cl.navbar, className)}>
      <div className={cl.courseDetails}>
        <div className={cx(tc.tableHeader, cl.lessonTitle)}>{lessonTitle}</div>
        <div className={cl.progressGroup}>
          <progress className={cl.progressBar} value="50" max="100"></progress>
          <div className={tc.bodyText}>{courseProgress}%</div>
        </div>
      </div>
      <div className={cl.buttons}>
        <Button buttonStyle="secondary" onClick={goToPreviousLecture}>
          {"< Previous Lesson"}
        </Button>
        <Button buttonStyle="primary" onClick={goToNextLecture}>
          {"Complete and Continue >"}
        </Button>
      </div>
    </nav>
  );
};
