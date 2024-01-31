import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";

import { LectureSection, RouteParams } from "./types";

import cl from "./layout.module.scss";

type LecturePageLayoutProps = {
  params: RouteParams;
  children: React.ReactNode;
};

export const getCourseLectures = async (courseId: string) => {
  const lecture = await api<LectureSection>(
    `${FEDORA_HOST}/api/v1/courses/${courseId}/lecture_sections`
  );
};

const LecturePageLayout = ({ children, params }: LecturePageLayoutProps) => {
  const { courseId } = params;
  getCourseLectures(courseId);
  return (
    <div className={cl.lessonLayout}>
      <nav style={{ gridArea: "nav" }}>navbar</nav>
      <aside style={{ gridArea: "sidebar" }}>aside</aside>
      <main style={{ gridArea: "content" }}>content{children}</main>;
    </div>
  );
};

export default LecturePageLayout;
