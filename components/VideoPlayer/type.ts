export enum Status {
  queued = "QUEUED",
  processing = "PROCESSING",
  partially_ready = "PARTIALLY_READY",
  ready = "READY",
  thumbnail_ready = "THUMBNAIL_READY",
  failed = "FAILED",
  reupload = "REUPLOAD",
  unavailable = "UNAVAILABLE",
}

export type VideoDataType = {
  video_id: string;
  upload_retries_cap_reached: boolean;
  teachable_application_key: string;
  status: Status;
  signature: string;
};

export type VideoPlayerEvent = {
  id: string;
  event: string;
  media: {
    code: string;
    duration: number;
    percent_watched: number;
    aggregate_time_watched: number;
    aggregate_percent_watched: number;
    title: string;
  };
};

export type EmbedVideoPlayerProps = {
  loading: boolean;
  hotmart_host_id?: string;
  origin?: string;
  status: Status;
  signature?: string;
  token?: string;
  disablePointerEvents?: boolean;
  onEvent?: (event: VideoPlayerEvent, parentEvent: MessageEvent) => void;
};

export type VideoPlayerProps = {
  userId: number;
  videoId: number;
};
