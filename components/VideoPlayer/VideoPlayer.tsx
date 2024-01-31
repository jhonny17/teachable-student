"use client";
import { useEffect, useState } from "react";

import { api } from "@/utils/api";

import {
  Status,
  EmbedVideoPlayerProps,
  VideoPlayerProps,
  VideoDataType,
} from "./type";

import cl from "./VideoPlayer.module.scss";

const fetchPrivateVideo = async (attachmentId: number) => {
  const endpoint = `http://business-school.worksonmy.computer:3000/api/v2/hotmart/private_video?attachment_id=${attachmentId}`;
  const response = await api(endpoint);

  return { data: response } as { data?: VideoDataType };
};

export const canPlayVideo = (status: Status): boolean =>
  [Status.ready, Status.thumbnail_ready].includes(status);

export const shouldOverlayHaveBackground = (status: Status): boolean =>
  [
    Status.queued,
    Status.processing,
    Status.failed,
    Status.reupload,
    Status.unavailable,
  ].includes(status);

export const EmbedVideoPlayer = ({
  signature,
  token,
  status,
  loading,
  hotmart_host_id,
}: EmbedVideoPlayerProps) => {
  const isVideoLoading =
    typeof window === "undefined" ||
    loading ||
    !canPlayVideo(status) ||
    !hotmart_host_id ||
    !signature ||
    !token;

  if (isVideoLoading) {
    return <div>Loading Video Player...</div>;
  }

  const url = `https://player.hotmart.com/embed/${hotmart_host_id}?signature=${signature}&token=${token}`;

  return (
    <>
      <iframe
        title="Video Player"
        src={hotmart_host_id.length > 0 && url.length > 0 ? url : undefined}
        frameBorder="0"
        scrolling="no"
        name="hotmart_embed"
        className={cl.embedVideoPlayer}
        data-testid="embed-player"
        referrerPolicy="strict-origin"
        allowFullScreen
        allow="autoplay; fullscreen"
      />
    </>
  );
};

export const VideoPlayer = ({ userId, videoId }: VideoPlayerProps) => {
  const [data, setData] = useState<VideoDataType | null>(null);

  useEffect(() => {
    fetchPrivateVideo(videoId).then(({ data }) => {
      setData(data ?? null);
    });
  }, [videoId]);

  const { signature, teachable_application_key, video_id, status } = data ?? {};
  const url = `https://player.hotmart.com/embed/${video_id}?signature=${signature}&token=${teachable_application_key}`;

  return (
    <EmbedVideoPlayer
      loading={!data}
      hotmart_host_id={video_id}
      signature={signature}
      token={teachable_application_key}
      status={status ?? Status.unavailable}
      disablePointerEvents={false}
    />
  );
};
