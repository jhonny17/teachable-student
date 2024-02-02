import cx from "classnames";

import tc from "@usefedora/ui/public/type-modules";

import { Attachment } from "../../types";

import cl from "./TextAttachment.module.scss";

type TextAttachmentProps = {
  attachment: Attachment;
};

export const TextAttachment = ({ attachment }: TextAttachmentProps) => {
  const { id, text } = attachment;
  return (
    <div
      id={`${id}`}
      className={cx(tc.bodyText, cl.textAttachment)}
      dangerouslySetInnerHTML={{ __html: text ?? "" }}
    />
  );
};
