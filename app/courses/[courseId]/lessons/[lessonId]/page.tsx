"use client";

import { api } from "@/utils/api";
import { VideoPlayer } from "@/components/VideoPlayer";
import cl from "./lesson.module.scss";

import {
  LessonAttachmentsParams,
  LessonPageProps,
  ResponseAttachments,
} from "./types";
import { useEffect } from "react";

const initAdmin = async ({ courseId, lessonId }: LessonAttachmentsParams) => {
  try {
    const data = await api<ResponseAttachments>(
      `http://business-school.worksonmy.computer:3000/api/v1/courses/${courseId}/lectures/${lessonId}/attachments`
    );

    return data.attachments;
  } catch (error) {
    return null;
  }
};
const LecturePage = ({ params }: LessonPageProps) => {
  useEffect(() => {
    const execute = async () => {
      await initAdmin(params);
    };
    execute();
  }, [params]);
  return (
    <div className={cl.lessonPage}>
      <div>
        <VideoPlayer userId={-1} videoId={105} />
      </div>
      <div>attachment index</div>
    </div>
  );
};

export default LecturePage;
