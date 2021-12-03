import { useQuery } from "react-query";

import { axios } from "@/lib/axios";
import { Profile } from "@/types/Profile";

export async function getProfile({
  userId,
}: {
  userId: string;
}): Promise<Profile> {
  const url = `/v1/users/${userId}/profile`;

  let profile: Profile;

  // "Post-Redirect-Get" design pattern
  try {
    profile = await axios.get(url);
  } catch (error) {
    // If profile doesn't exist, attempt to create it
    if (error.response?.status === 404) {
      profile = await axios.post(url);
    } else {
      throw error;
    }
  }

  return profile;
}

type UseProfile = {
  userId?: string;
};

export function useProfile({ userId }: UseProfile) {
  return useQuery(
    ["profile", userId],
    () => {
      if (!userId) return;
      return getProfile({ userId });
    },
    {
      staleTime: Infinity,
      enabled: !!userId,
    }
  );
}
