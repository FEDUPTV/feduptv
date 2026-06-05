import { supabaseAdmin } from "./supabase-admin";

export async function uploadApplicantFiles(
  files: File[],
  folder: string
) {
  const photo_urls: string[] = [];
  const video_urls: string[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${ext}`;

    const isVideo = file.type.startsWith("video/");
    const subfolder = isVideo ? "videos" : "photos";

    const path = `${folder}/${subfolder}/${filename}`;

    const bytes = Buffer.from(await file.arrayBuffer());

    const { error } = await supabaseAdmin.storage
      .from("applicants")
      .upload(path, bytes, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error(error);
      continue;
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage
      .from("applicants")
      .getPublicUrl(path);

    if (isVideo) {
      video_urls.push(publicUrl);
    } else {
      photo_urls.push(publicUrl);
    }
  }

  return {
    photo_urls,
    video_urls,
  };
}
