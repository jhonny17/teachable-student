"use client";
import { useEffect } from "react";

import resetStyles from "@usefedora/ui/public/reset";
import commonStyles from "@usefedora/ui/public/common";
import tokensStyles from "@usefedora/uni/public/tokens";

import { RouteParams } from "./types";
import { NavBar } from "@/components/NavBar";
import { Sidebar } from "./components/Sidebar";

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
  useEffect(() => {
    injectStyles(resetStyles);
    injectStyles(commonStyles);
    injectStyles(tokensStyles);
  }, []);

  return (
    <div className={cl.lessonLayout}>
      <NavBar
        lessonTitle="New Lesson"
        courseProgress={50}
        className={cl.navbarLessonLayout}
      />
      <aside className={cl.asideLessonLayout}>
        <Sidebar params={params} />
      </aside>
      <main className={cl.contentLessonLayout}>{children}</main>
    </div>
  );
};

export default LecturePageLayout;
