import * as qs from "query-string";

import { MediaRequest, MediaResponse } from "@/types/Media";
import { Severity } from "@/stores/notifications";
import { createNotification } from "@/game/engine/notification";
import { axios } from "@/lib/axios";

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

  return res.links;
}
