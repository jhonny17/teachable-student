"use client";

import cx from "classnames";
import { useEffect, useState } from "react";

import { Heading, List, ListElement, useEventListener } from "@usefedora/ui";

import { getStringFromHtml } from "@/utils/getStringFromHtml";
import { AttachmentSelector } from "@/components/AttachmentSelector";

import { Attachment, LessonPageProps } from "./types";

import cl from "./lesson.module.scss";
import { useLessonsContext } from "@/contexts/LessonsContext";

const LecturePage = ({ params }: LessonPageProps) => {
  const { getAttachments } = useLessonsContext();

  const [, attachmentIdParam] = window.location.hash.split("#");

  const [attachmentIds, setAttachmentIds] = useState<number[]>([]);
  const [attachmentList, setAttachmentList] = useState<Attachment[]>([]);

  const currentAttachmentId = !isNaN(+attachmentIdParam)
    ? +attachmentIdParam
    : attachmentIds[0];

  const saveAttachmentIds = (attachments: Attachment[]) => {
    const ids = attachments.map((attachment) => attachment.id);
    const [firstId] = ids;
    window.location.replace(`#${firstId}`);
    setAttachmentIds(ids);
  };

  useEffect(() => {
    const execute = async () => {
      try {
        const attachments = await getAttachments(params);
        setAttachmentList(attachments);
        saveAttachmentIds(attachments);
      } catch (error) {
        return null;
      }
    };
    execute();
  }, [getAttachments, params]);

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

  const setActiveIndexAttachment = (id: number) => {
    const elements = document.getElementsByClassName(cl.element);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.id === `${id}`) {
        elements[i].classList.add(cl.active);
      } else {
        elements[i].classList.remove(cl.active);
      }
    }
  };

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
                <ListElement
                  id={`${id}`}
                  className={cx(
                    cl.element,
                    attachmentIdParam === `${id}` && cl.active
                  )}
                  onClick={() => setActiveIndexAttachment(id)}
                >
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
