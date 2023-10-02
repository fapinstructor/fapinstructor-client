import * as qs from "query-string";

import { MediaLink, MediaRequest, MediaResponse } from "@/types/Media";
import { Severity } from "@/stores/notifications";
import { createNotification } from "@/game/engine/notification";
import { axios } from "@/lib/axios";
import { searchRedGifs } from "@/api/redgifs/redgifs";

const failedSubreddits: string[] = [];

export default async function fetchRedditPics(request: MediaRequest) {
  // Filter out any previously failed subreddits.
  const filteredSubreddits = request.subreddits.filter(
    (subreddit) => !failedSubreddits.includes(subreddit)
  );

  if (filteredSubreddits.length === 0) {
    createNotification({
      message: "Error fetching all subreddits!",
      duration: -1,
      severity: Severity.ERROR,
    });
    return;
  }

  const url = `/v1/reddit?${qs.stringify(
    { ...request, subreddits: filteredSubreddits },
    { arrayFormat: "comma" }
  )}`;

  const res: MediaResponse = await axios.get(url);

  // Append failed subreddits to the filter array.
  failedSubreddits.push(...res.failedSubreddits);

  // Notify user of failed subreddits
  res.failedSubreddits.forEach((subreddit) => {
    createNotification({
      message: `Error fetching subreddit: ${subreddit}`,
      duration: -1,
      severity: Severity.ERROR,
    });
  });

  const redGifLinks = await resolveRedgifsLinks(
    res.links.filter((link) => link.directLink.includes("redgifs"))
  );
  const links = res.links.filter(
    (link) => !link.directLink.includes("redgifs")
  );

  console.log(redGifLinks);

  return [...links, ...redGifLinks];
}

// Asynchronously resolve signed urls for redgif links.
async function resolveRedgifsLinks(redGifLinks: MediaLink[]) {
  const redgifsSignedLinksPromise = await Promise.allSettled(
    redGifLinks.map((link) => {
      const redGifID = link.directLink.split("/")[3].split("-")[0];
      return searchRedGifs(redGifID.toLowerCase());
    })
  );

  const redgifsSignedLinks = redgifsSignedLinksPromise
    .filter(
      (linkPromise): linkPromise is { status: "fulfilled"; value: MediaLink } =>
        linkPromise.status === "fulfilled"
    )
    .map((link) => link.value);

  return redgifsSignedLinks;
}
