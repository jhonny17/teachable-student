"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Heading, List, ListElement, useEventListener } from "@usefedora/ui";

import { api } from "@/utils/api";
import { FEDORA_HOST } from "@/utils/constants";
import { getStringFromHtml } from "@/utils/getStringFromHtml";

import {
  Attachment,
  LessonAttachmentsParams,
  LessonPageProps,
  ResponseAttachments,
} from "./types";

import cl from "./lesson.module.scss";
import { AttachmentSelector } from "./components/AttachmentSelector";

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
  const [, attachmentIdParam] = window.location.hash.split("#");

  const [attachmentIds, setAttachmentIds] = useState<number[]>([]);
  const [attachmentList, setAttachmentList] = useState<Attachment[]>([]);

  const currentAttachmentId = !isNaN(+attachmentIdParam)
    ? +attachmentIdParam
    : attachmentIds[0];

  const saveAttachmentIds = (attachments: Attachment[]) => {
    const ids = attachments.map((attachment) => attachment.id);
    setAttachmentIds(ids);
  };

  useEffect(() => {
    const execute = async () => {
      try {
        const attachments = await initAdmin(params);
        setAttachmentList(attachments);
        saveAttachmentIds(attachments);
      } catch (error) {
        return null;
      }
    };
    execute();
  }, [params]);

  const goToPreviousAttachment = () => {
    const currentAttachmentIndex = attachmentIds.indexOf(currentAttachmentId);
    const previousAttachmentId = attachmentIds[currentAttachmentIndex - 1];
    if (!previousAttachmentId) return;
    window.location.replace(`#${previousAttachmentId}`);
  };

  const goToNextAttachment = () => {
    const currentAttachmentIndex = attachmentIds.indexOf(
      Number(currentAttachmentId)
    );
    const nextAttachmentId = attachmentIds[currentAttachmentIndex + 1];
    if (!nextAttachmentId) return;
    window.location.replace(`#${nextAttachmentId}`);
  };

  const trackKeyCourseChanger = (event: KeyboardEvent) => {
    console.log({ attachmentIds: event.key });
    if (attachmentIds.length <= 0) return;

    if (event.altKey && event.key === "ArrowLeft") {
      goToPreviousAttachment();
      return;
    }

    if (event.altKey && event.key === "ArrowRight") {
      goToNextAttachment();
      return;
    }
  };

  useEventListener("keydown", trackKeyCourseChanger);

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
