"use client";

import cx from "classnames";
import { Button } from "@usefedora/ui";
import tc from "@usefedora/ui/public/type-modules";

import { NavBarProps } from "./type";
import cl from "./NavBar.module.scss";
import { Trophy } from "@usefedora/icons";

export const NavBar = ({
  lessonTitle,
  courseProgress,
  className,
}: NavBarProps) => {
  return (
    <nav className={cx(cl.navbar, className)}>
      <div className={cl.courseDetails}>
        <div className={cx(tc.tableHeader, cl.lessonTitle)}>{lessonTitle}</div>
        <div className={cl.progressGroup}>
          <progress className={cl.progressBar} value="50" max="100"></progress>
          <div className={tc.bodyText}>{courseProgress}%</div>
          <Trophy />
        </div>
      </div>
      <div className={cl.buttons}>
        <Button buttonStyle="secondary">{"< Previous Lesson"}</Button>
        <Button buttonStyle="primary">{"Complete and Continue >"}</Button>
      </div>
    </nav>
  );
};
