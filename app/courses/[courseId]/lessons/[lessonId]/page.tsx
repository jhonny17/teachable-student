"use client";

import { useEffect, useState } from "react";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";
import { VideoPlayer } from "@/components/VideoPlayer";

import {
  Attachment,
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
    return [];
  }
};
const LecturePage = ({ params }: LessonPageProps) => {
  const [attachmentList, setAttachmentList] = useState<Attachment[]>([]);
  useEffect(() => {
    const execute = async () => {
      try {
        const attachments = await initAdmin(params);
        setAttachmentList(attachments);

      } catch (error) {
        return null;
      }
    };
    execute();
  }, [params]);
  return (
    <div className={cl.lessonPage}>
      <div>
        <VideoPlayer userId={-1} videoId={1} />
        {/* TODO: Add unique ids to the mapped items */}
        {attachmentList.map((attachment: Attachment)=> (<div id={attachment.name}>{attachment.name}</div>))}
      </div>
      <div>{attachmentList.map((attachment: Attachment)=> (<span><a href={'#' + attachment.name}>{attachment.name}</a></span>))}</div>
    </div>
  );
};

export default LecturePage;
