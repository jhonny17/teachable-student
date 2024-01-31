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
  const response = await api(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "ahoy_visitor=3c93d8fd-475c-41a8-b55b-5f145775bebf; _session_id=512ed49de783523239db805f790871bf; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=%22e6ff48a2-a3e0-4964-9f7d-35be0adb1eeb%22; sk_ygxzxycv_access=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ1c2VyIiwiaWF0IjoxNzA1MzMxOTUzLCJqdGkiOiIwYmE2Njc5YS1hOTFmLTQzOTYtYmIzMC0wZGIzYjQ0N2RiZGYiLCJpc3MiOiJza195Z3h6eHljdiIsInN1YiI6IjIzYmI5OWU1LTU0NWEtNDU2My1hNmViLTE2MGU1ZjNiNWY5YSJ9.7yqxSsaU4ofjppqOPybzNDp7a8MYtUo1kd50uAVCK4g; sk_ygxzxycv_remember_me=1; signed_in=true; __zlcmid=1JpmQKcK0DcgQFf; __stripe_mid=83da5c82-3cd9-481b-8765-aa13c8403dc3ced634; ahoy_visit=d2accff4-2b16-4428-9569-145a344d60a2; admin_csrf_token=pfoqjSfRs37DZamqRIGqpG032UQeafqVGgHbo5kZTyFrDrLob3YpALfwpl1f0EefPXHeFo7zoDNyVClWvY0G0A%3D%3D",
      "x-csrf-token":
        "pfoqjSfRs37DZamqRIGqpG032UQeafqVGgHbo5kZTyFrDrLob3YpALfwpl1f0EefPXHeFo7zoDNyVClWvY0G0A==",
    },
  });

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
