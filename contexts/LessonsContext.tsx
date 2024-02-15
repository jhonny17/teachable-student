import { createContext, useContext, useState } from "react";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";

import {
  Attachment,
  LessonAttachmentsParams,
  ResponseAttachments,
} from "@/app/courses/[courseId]/lessons/[lessonId]/types";

export type LessonsContextProps = {
  getAttachments: (params: LessonAttachmentsParams) => Promise<Attachment[]>;
};

const LessonsContext = createContext<LessonsContextProps>({
  getAttachments: async () => [],
});

export const useLessonsContext = () => useContext(LessonsContext);

type LessonAttachments = {
  [key: string]: Attachment[];
};

export type LessonsProviderProps = {
  children: React.ReactNode;
};

export const LessonsProvider = ({ children }: LessonsProviderProps) => {
  const [lessons, setLessons] = useState<LessonAttachments>({});

  const fetchLessonAttachments = async ({
    courseId,
    lessonId,
  }: LessonAttachmentsParams) => {
    try {
      const data = await api<ResponseAttachments>(
        `${FEDORA_HOST}/api/v1/courses/${courseId}/lectures/${lessonId}/attachments`
      );
      return data.attachments;
    } catch (error) {
      return [];
    }
  };

  const getAttachments = async ({
    courseId,
    lessonId,
  }: LessonAttachmentsParams) => {
    if (lessons[lessonId]) return lessons[lessonId];

    const attachments = await fetchLessonAttachments({ courseId, lessonId });
    setLessons((prev) => ({ ...prev, [lessonId]: attachments }));
    return attachments;
  };

  return (
    <LessonsContext.Provider value={{ getAttachments }}>
      {children}
    </LessonsContext.Provider>
  );
};
