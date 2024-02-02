import { Attachment } from "../../types";

import { TextAttachment } from "../TextAttachment";
import { ImageAttachment } from "../ImageAttachment";
import { VideoAttachment } from "../VideoAttachment";

type AttachmentSelectorProps = {
  attachment: Attachment;
};

export const AttachmentSelector = ({ attachment }: AttachmentSelectorProps) => {
  const { kind } = attachment;

  switch (kind) {
    case "text":
      return <TextAttachment attachment={attachment} />;
    case "image":
      return <ImageAttachment attachment={attachment} />;
    case "video":
      return <VideoAttachment attachment={attachment} />;
    default:
      return null;
  }
};
