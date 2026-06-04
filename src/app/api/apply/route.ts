import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { v4 as uuidv4 } from "uuid";

function toInt(value: unknown) {
  if (value === "" || value === undefined || value === null) return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function toBool(value: unknown) {
  if (value === "yes" || value === true) return true;
  if (value === "no" || value === false) return false;
  return null;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const rawData = form.get("data");

    if (!rawData || typeof rawData !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing application data" },
        { status: 400 }
      );
    }

    const body = JSON.parse(rawData);

    const folderName = `${body.first_name || "applicant"}-${
      body.last_name || "unknown"
    }-${uuidv4()}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const photoUrls: string[] = [];
    const videoUrls: string[] = [];

    const files = form.getAll("files");

    for (const item of files) {
      if (!(item instanceof File)) continue;

      const isVideo = item.type.startsWith("video/");
      const folderType = isVideo ? "videos" : "photos";

      const safeName = item.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9.-]/g, "");

      const filePath = `${folderName}/${folderType}/${uuidv4()}-${safeName}`;
      const arrayBuffer = await item.arrayBuffer();

      const { error: uploadError } = await supabaseAdmin.storage
        .from("applicant-uploads")
        .upload(filePath, Buffer.from(arrayBuffer), {
          contentType: item.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json(
          { success: false, error: uploadError.message },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("applicant-uploads")
        .getPublicUrl(filePath);

      if (isVideo) {
        videoUrls.push(publicUrlData.publicUrl);
      } else {
        photoUrls.push(publicUrlData.publicUrl);
      }
    }

    const { data, error } = await supabaseAdmin
      .from("applicants")
      .insert([
        {
          first_name: body.first_name,
          last_name: body.last_name,
          prison_name: body.prison_name,

          age: toInt(body.age),
          birthdate: body.birthdate || null,

          phone: body.phone,
          email: body.email,
          address: body.address,

          charges: body.charges,
          time_served: body.time_served,
          jurisdiction: body.jurisdiction,

          children: body.children,
          children_count: toInt(body.children_count),

          occupation: body.occupation,

          instagram: body.instagram,
          tiktok: body.tiktok,
          facebook: body.facebook,

          fed_up_story: body.fed_up_story,
          underestimated_story: body.underestimated_story,
          shocking_truth: body.shocking_truth,

          confrontation_story: body.confrontation_story,
          selection_reason: body.selection_reason,
          scroll_stopper_story: body.scroll_stopper_story,

          prison_story_rating: toInt(body.prison_story_rating),

          over_18: toBool(body.over_18),
          can_travel_orlando: toBool(body.can_travel_orlando),

          producer_notes: body.producer_notes,

          application_folder: folderName,
          photo_urls: photoUrls,
          video_urls: videoUrls,

          status: "New",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      applicant: data,
      folder: folderName,
      photo_urls: photoUrls,
      video_urls: videoUrls,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
