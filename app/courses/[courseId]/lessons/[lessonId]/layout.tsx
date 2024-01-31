import cl from "./layout.module.scss";

type LecturePageLayoutProps = {
  children: React.ReactNode;
};

const LecturePageLayout = ({ children }: LecturePageLayoutProps) => {
  return (
    <div className={cl.lessonLayout}>
      <nav style={{ gridArea: "nav" }}>navbar</nav>
      <aside style={{ gridArea: "sidebar" }}>aside</aside>
      <main style={{ gridArea: "content" }}>content{children}</main>;
    </div>
  );
};

export default LecturePageLayout;
