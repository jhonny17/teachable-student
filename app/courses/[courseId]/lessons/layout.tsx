import { ReactNode } from "react";

export type LessonsLayoutProps = {
  children: ReactNode;
};

const LessonsLayout = ({ children }: LessonsLayoutProps) => {
  return <>{children}</>;
};

export default LessonsLayout;
