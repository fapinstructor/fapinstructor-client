import * as qs from "query-string";

import { MediaRequest, MediaResponse, MediaType } from "@/types/Media";
import { Severity } from "@/stores/notifications";
import { createNotification } from "@/game/engine/notification";
import { axios } from "@/lib/axios-new";

const mediaTypeMap = { PICTURE: "image", GIF: "video", VIDEO: "video" };
const newMediaTypeMap: Record<string, MediaType> = {
  image: MediaType.Picture,
  video: MediaType.Video,
  gif: MediaType.Gif,
};

export default async function fetchRedditPics(
  request: MediaRequest
): Promise<MediaResponse["links"] | undefined> {
  if (request.subreddits.length === 0) {
    createNotification({
      message: "Error fetching all subreddits!",
      duration: -1,
      severity: Severity.ERROR,
    });
    return;
  }

  const mediaTypes = Array.from(
    new Set(request.mediaTypes.map((type) => mediaTypeMap[type]))
  );

  const url = `/media?${qs.stringify(
    { mediaTypes, tags: request.subreddits },
    { arrayFormat: "comma" }
  )}`;

  const res: NewMediaLinks = await axios.get(url);

  const adapatedLinks = res.links.map((link) => ({
    sourceLink: link.source.url,
    directLink: link.url,
    mediaType: newMediaTypeMap[link.mediaType],
  }));

  return adapatedLinks;
}

type NewMediaLink = {
  mediaType: string;
  source: { id: string; url: string };
  tag: string;
  url: string;
};

type NewMediaLinks = {
  links: NewMediaLink[];
};
