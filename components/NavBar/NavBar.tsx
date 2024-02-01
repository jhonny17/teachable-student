"use client";

import { NavBarProps } from "./type";

import cl from "./NavBar.module.scss";
import { AnchorButton } from "@usefedora/ui";

export const NavBar = ({ lessonTitle, courseProgress }: NavBarProps) => {
  return (
    <div className={cl.navbar}>
      <div className={cl.details}>
        <div className={cl.lessonTitle}>{lessonTitle}</div>
        <progress className={cl.progressBar} value="50" max="100"></progress>
        <div className={cl.courseProgress}>{courseProgress}%</div>
      </div>
      <div className={cl.buttons}>
        <AnchorButton className={cl.navButtonPrevious} buttonStyle="secondary">
          {"< Previous Lesson"}
        </AnchorButton>
        <AnchorButton className={cl.navButtonContinue} buttonStyle="primary">
          {"Complete and Continue >"}
        </AnchorButton>
      </div>
    </div>
  );
};
