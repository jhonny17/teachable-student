"use client";

import { api } from "@/utils/api";
import { VideoPlayer } from "@/components/VideoPlayer";
import cl from "./lesson.module.scss";

import {
  LessonAttachmentsParams,
  LessonPageProps,
  ResponseAttachments,
} from "./types";
import { useEffect } from "react";

const initAdmin = async ({ courseId, lessonId }: LessonAttachmentsParams) => {
  try {
    const data = await api<ResponseAttachments>(
      `http://business-school.worksonmy.computer:3000/api/v1/courses/${courseId}/lectures/${lessonId}/attachments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "ahoy_visitor=3c93d8fd-475c-41a8-b55b-5f145775bebf; _session_id=512ed49de783523239db805f790871bf; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=%22e6ff48a2-a3e0-4964-9f7d-35be0adb1eeb%22; sk_ygxzxycv_access=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ1c2VyIiwiaWF0IjoxNzA1MzMxOTUzLCJqdGkiOiIwYmE2Njc5YS1hOTFmLTQzOTYtYmIzMC0wZGIzYjQ0N2RiZGYiLCJpc3MiOiJza195Z3h6eHljdiIsInN1YiI6IjIzYmI5OWU1LTU0NWEtNDU2My1hNmViLTE2MGU1ZjNiNWY5YSJ9.7yqxSsaU4ofjppqOPybzNDp7a8MYtUo1kd50uAVCK4g; sk_ygxzxycv_remember_me=1; signed_in=true; __zlcmid=1JpmQKcK0DcgQFf; __stripe_mid=83da5c82-3cd9-481b-8765-aa13c8403dc3ced634; ahoy_visit=d2accff4-2b16-4428-9569-145a344d60a2; admin_csrf_token=pfoqjSfRs37DZamqRIGqpG032UQeafqVGgHbo5kZTyFrDrLob3YpALfwpl1f0EefPXHeFo7zoDNyVClWvY0G0A%3D%3D",
          "x-csrf-token":
            "pfoqjSfRs37DZamqRIGqpG032UQeafqVGgHbo5kZTyFrDrLob3YpALfwpl1f0EefPXHeFo7zoDNyVClWvY0G0A==",
        },
      }
    );

    return data.attachments;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
const LecturePage = ({ params }: LessonPageProps) => {
  useEffect(() => {
    const execute = async () => {
      const admin = await initAdmin(params);
      console.log({ admin });
    };
    execute();
  }, [params]);
  return (
    <div className={cl.lessonPage}>
      <div>
        <VideoPlayer userId={-1} videoId={105} />
      </div>
      <div>attachment index</div>
    </div>
  );
};

export default LecturePage;
