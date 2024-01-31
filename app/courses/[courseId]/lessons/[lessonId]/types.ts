export type LessonAttachmentsParams = {
  courseId: string;
  lessonId: string;
};

export type Attachment = {
  created_at: string;
  code_syntax: string | null;
  content_type: string;
  audio_type: string;
  should_be_uploaded_to_wistia: boolean;
  data: any; // You might want to replace 'any' with a more specific type if you know the structure
  schema: any; // Same as above
  full_url: string;
  cdn_url: string;
  alt_text: string | null;
  flagged_as_decorative: boolean | null;
  url: string;
  host_id: string | null;
  source: string;
  kind: string;
  name: string;
  host: string;
  position: number;
  attachable_id: number;
  is_published: boolean;
  downloadable: boolean;
  text: string | null;
  attachable_type: string;
  thumbnail_url: string | null;
  meta: Record<string, any>; // You might want to replace 'Record<string, any>' with a more specific type if you know the structure
  embeddable: boolean;
  id: number;
  display_text: string;
  plain_text_html: string;
  duration: number;
  captions: string[];
  hotmart_host_id: string;
  should_upload_to_hotmart: boolean;
  hotmart_video_download_ready: boolean;
  hotmart_url: string;
  download_url: string;
};

export type ResponseAttachments = {
  attachments: Attachment[];
};

export type LessonPageProps = {
  params: {
    courseId: string;
    lessonId: string;
  };
};
