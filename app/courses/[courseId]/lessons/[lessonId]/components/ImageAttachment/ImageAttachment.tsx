import { Attachment } from "../../types";
import cl from "./ImageAttachment.module.scss";

type ImageAttachmentProps = {
  attachment: Attachment;
};

export const ImageAttachment = ({ attachment }: ImageAttachmentProps) => {
  const { id, url, alt_text } = attachment;
  return (
    <div id={`${id}`} className={cl.imageAttachment}>
      <img src={url} alt={alt_text ?? "Representative image of the topic"} />
    </div>
  );
};
