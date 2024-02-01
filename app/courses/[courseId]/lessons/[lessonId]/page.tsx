"use client";

import { useEffect, useState } from "react";

import { api } from "@/utils/api";
import sc from '@usefedora/ui/public/spacing-modules'
import tc from '@usefedora/ui/public/type-modules'
import { FEDORA_HOST } from "@/utils/constants";
import { VideoPlayer } from "@/components/VideoPlayer";

import {
  Attachment,
  LessonAttachmentsParams,
  LessonPageProps,
  ResponseAttachments,
} from "./types";

import cl from "./lesson.module.scss";
import { List, ListElement } from '@usefedora/ui'

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
        <VideoPlayer userId={-1} videoId={10} />
        {attachmentList.map((attachment: Attachment)=> (
          <div key={attachment.name || 'text'}>
            <h2 id={attachment.name}>{attachment.name || '--'}</h2>
            {attachment.text || ''}
          </div>
        ))}
      </div>
      <div className={cl.attachments_sideSection}>
        <nav className={`${sc.marginLeftS} + ${sc.marginTopM} `}>
          <div className={'p-b-4-xs dsp-flex-xs flex-align-items-center-xs'}>
            <h2 id="outline-header"
                className={`${tc.headingDisplay2} + 'm-r-3-xs' + ${cl.outlineHeaderText}`}
                >
                  In this lesson
            </h2>
          </div>
          <div role="menu" className={cl.scrollContainer}>
            <ul className={cl.attachmentList}>
                {attachmentList.map((attachment: Attachment)=> (
                  <li key={"item " + `${attachment.name}`} className={`${tc.bodyTextExtraSmallLink} + uni-ph-16 uni-pv-8 dsp-block-xs item`}>
                    <a href={'#' + attachment.name}>{attachment.name || 'Lesson Text'}</a>
                  </li>
                  ))
                }

            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default LecturePage;
