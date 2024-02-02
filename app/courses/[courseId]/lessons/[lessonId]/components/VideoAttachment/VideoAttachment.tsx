import { VideoPlayer } from "@/components/VideoPlayer";
import { Attachment } from "../../types";

type VideoAttachmentProps = {
  attachment: Attachment;
};

export const VideoAttachment = ({ attachment }: VideoAttachmentProps) => {
  const { id } = attachment;
  return (
    <div id={`${id}`}>
      <VideoPlayer videoId={id} />
    </div>
  );
};
