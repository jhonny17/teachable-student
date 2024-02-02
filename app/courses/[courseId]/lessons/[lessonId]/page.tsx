"use client";

import { useEffect, useState } from "react";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";

import {
  Attachment,
  LessonAttachmentsParams,
  LessonPageProps,
  ResponseAttachments,
} from "./types";

import cl from "./lesson.module.scss";
import { AttachmentSelector } from "./components/AttachmentSelector";
import { Heading, List, ListElement } from "@usefedora/ui";
import { getStringFromHtml } from "@/utils/getStringFromHtml";

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
      <div className={cl.lessonAttachmentContainer}>
        {attachmentList.map((attachment: Attachment) => {
          const { id } = attachment;
          return <AttachmentSelector key={id} attachment={attachment} />;
        })}
      </div>
      <nav className={cl.lessonAttachmentIndex}>
        <List className={cl.indexAttachmentList}>
          <Heading level={3}>In this lesson</Heading>
          {attachmentList.map((attachment: Attachment, index: number) => {
            const { id, name, text } = attachment;
            let value: string | null | undefined = name;

            if (!value) {
              value = getStringFromHtml(text ?? "")?.slice(0, 50);
              if (value) {
                value += "...";
              }
            }

            if (!value) {
              value = `Block ${index + 1}`;
            }

            return (
              <a
                key={`index-${id}`}
                href={`#${id}`}
                className={cl.indexAttachmentListItem}
              >
                <ListElement>
                  <span dangerouslySetInnerHTML={{ __html: value }} />
                </ListElement>
              </a>
            );
          })}
        </List>
      </nav>
    </div>
  );
};

export default LecturePage;
