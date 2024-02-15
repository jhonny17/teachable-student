import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LectureSection } from "../lessons/[lessonId]/types";
import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";

export type CourseContextProps = {
  lectureIds: number[];
  lectureSections: LectureSection[];
};

const CourseContext = createContext({
  lectureIds: [],
  lectureSections: [],
} as CourseContextProps);

export const useCourseContext = () => useContext(CourseContext);

export type CourseProviderProps = {
  courseId: string;
  children: ReactNode;
};

export const CourseProvider = ({ courseId, children }: CourseProviderProps) => {
  const [lectureIds, setLecturesIds] = useState<number[]>([]);
  const [lectureSections, setLectureSections] = useState<LectureSection[]>([]);

  const getCourseLectures = async (courseId: string) => {
    const lectureSections = await api<LectureSection>(
      `${FEDORA_HOST}/api/v1/courses/${courseId}/lecture_sections`
    );

    return lectureSections;
  };

  const saveLectureIds = (lectureSections: LectureSection[]) => {
    const ids = lectureSections.reduce((acc, section) => {
      const lectureIds = section.lectures.map((lecture) => lecture.id);
      return [...acc, ...lectureIds];
    }, [] as number[]);

    setLecturesIds(ids);
  };

  useEffect(() => {
    getCourseLectures(courseId).then(({ lecture_sections }) => {
      saveLectureIds(lecture_sections);
      setLectureSections(lecture_sections);
    });
  }, [courseId]);

  const values = {
    lectureIds,
    lectureSections,
  };

  return (
    <CourseContext.Provider value={values}>{children}</CourseContext.Provider>
  );
};
