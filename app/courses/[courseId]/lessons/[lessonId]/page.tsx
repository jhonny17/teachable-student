"use client";

import { useEffect } from "react";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";
import { VideoPlayer } from "@/components/VideoPlayer";

import {
  LessonAttachmentsParams,
  LessonPageProps,
  ResponseAttachments,
} from "./types";

import cl from "./lesson.module.scss";

const initAdmin = async ({ courseId, lessonId }: LessonAttachmentsParams) => {
  try {
    const data = await api<ResponseAttachments>(
      `${FEDORA_HOST}/api/v1/courses/${courseId}/lectures/${lessonId}/attachments`
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
        <VideoPlayer userId={-1} videoId={2} />
      </div>
      <div>attachment index</div>
    </div>
  );
};

export default LecturePage;
