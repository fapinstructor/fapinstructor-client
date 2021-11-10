import { useQuery } from "react-query";

import { axios } from "@/lib/axios";

import type { Tag } from "../types/Tag";

export function getTags(): Promise<Tag[]> {
  return axios.get("/v1/tags");
}

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
    staleTime: 60_000,
  });
}
