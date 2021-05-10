import createNotification from "engine/createNotification";
import { Severity } from "common/store/notifications";
import qs from "query-string";
import { MediaRequest, MediaResponse } from "common/types/Media";

import api from "common/api/client";

const failedSubreddits: string[] = [];

export default async function fetchRedditPics(request: MediaRequest) {
  // filter out any previously failed subreddits
  const filteredSubreddits = request.subreddits.filter(
    (subreddit) => !failedSubreddits.includes(subreddit)
  );

  const url = `/v1/reddit?${qs.stringify(
    { ...request, subreddits: filteredSubreddits },
    { arrayFormat: "comma" }
  )}`;

  const res = await api.get<MediaResponse>(url);

  // Append failed subreddits to the filter array
  failedSubreddits.push(...res.data.failedSubreddits);

  // Notify user of failed subreddits
  res.data.failedSubreddits.forEach((subreddit) => {
    createNotification({
      message: `Error fetching subreddit: ${subreddit}`,
      duration: -1,
      severity: Severity.ERROR,
    });
  });

  return res.data.links;
}
