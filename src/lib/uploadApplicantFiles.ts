import { supabaseAdmin } from "./supabase-admin";

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "mp4", "mov"]);
const REJECTED_IPHONE_EXTENSIONS = new Set(["heic", "heif"]);
const MAX_PHOTO_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

export class UploadValidationError extends Error {
  status = 400;

  constructor(message: string) {
    super(message);
    this.name = "UploadValidationError";
  }
}

export class UploadFailureError extends Error {
  status = 502;

  constructor() {
    super(
      "We were unable to upload one of your files. Please check your connection and try again."
    );
    this.name = "UploadFailureError";
  }
}

function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function getContentType(extension: string, suppliedType: string) {
  if (suppliedType) return suppliedType;

  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  if (extension === "png") return "image/png";
  if (extension === "mp4") return "video/mp4";
  if (extension === "mov") return "video/quicktime";

  return "application/octet-stream";
}

function sanitizePathSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export async function uploadApplicantFiles(
  files: File[],
  folder: string
) {
  const photo_urls: string[] = [];
  const video_urls: string[] = [];

  if (files.length === 0) {
    throw new UploadValidationError(
      "Please upload at least one JPG, JPEG, PNG, MP4, or MOV file before submitting."
    );
  }

  if (files.length > 10) {
    throw new UploadValidationError("Please upload no more than 10 files.");
  }

  for (const file of files) {
    const ext = getFileExtension(file.name);

    if (REJECTED_IPHONE_EXTENSIONS.has(ext)) {
      throw new UploadValidationError(
        "iPhone HEIC photos are not currently supported. Please convert to JPG and try again."
      );
    }

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      throw new UploadValidationError(
        "One of your uploaded files is not supported. Please upload JPG, JPEG, PNG, MP4, or MOV files."
      );
    }

    const isVideo = ext === "mp4" || ext === "mov";
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_PHOTO_SIZE;

    if (file.size > maxSize) {
      throw new UploadValidationError(
        isVideo ? "Videos must be under 50MB." : "Photos must be under 10MB."
      );
    }

    const baseName = sanitizePathSegment(
      file.name.replace(/\.[^.]+$/, "") || "upload"
    );
    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}-${baseName}.${ext}`;

    const subfolder = isVideo ? "videos" : "photos";

    const path = `${folder}/${subfolder}/${filename}`;

    const bytes = Buffer.from(await file.arrayBuffer());

    console.log("APPLICATION UPLOAD START", {
      path,
      size: file.size,
      type: getContentType(ext, file.type),
    });

    const { error } = await supabaseAdmin.storage
      .from("applicants")
      .upload(path, bytes, {
        contentType: getContentType(ext, file.type),
        upsert: false,
      });

    if (error) {
      console.error("APPLICATION UPLOAD ERROR", {
        path,
        message: error.message,
      });
      throw new UploadFailureError();
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

    console.log("APPLICATION UPLOAD COMPLETE", { path });
  }

  return {
    photo_urls,
    video_urls,
  };
}
