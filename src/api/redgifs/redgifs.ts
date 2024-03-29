import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { MediaLink, MediaType } from "@/types/Media";

const SESSION_STORAGE_REDGIF_TOKEN = "redgif_token";

async function fetchAuthToken() {
  const response = await axios<{ token: string }>(
    "https://api.redgifs.com/v2/auth/temporary"
  );
  return response.data.token;
}

function isTokenExpired(token: string) {
  const decoded = jwtDecode<JwtPayload>(token);
  if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
    return true;
  }
  return false;
}

function getAuthToken() {
  return sessionStorage.getItem(SESSION_STORAGE_REDGIF_TOKEN);
}

function setAuthToken(token: string) {
  return sessionStorage.setItem(SESSION_STORAGE_REDGIF_TOKEN, token);
}

const instance = axios.create();
instance.interceptors.request.use(async (request) => {
  let token = getAuthToken();
  if (!token || isTokenExpired(token)) {
    token = await fetchAuthToken();
    setAuthToken(token);
  }

  request.headers = {
    Authorization: `Bearer ${token}`,
  };

  return request;
});

type RedGif = {
  id: string;
  duration: number;
  urls: {
    hd: string;
  };
};

type TagsResponse = {
  tags: Array<{ name: string; count: number }>;
};

export async function getTags() {
  const response = await instance<TagsResponse>(
    `https://api.redgifs.com/v1/tags`
  );

  return response.data.tags.map((t) => t.name);
}

type SearchResponse = {
  gifs: RedGif[];
};

export async function searchRedGifs(...tags: string[]): Promise<MediaLink[]> {
  const response = await instance<SearchResponse>(
    `https://api.redgifs.com/v2/gifs/search?search_text=${tags.join(",")}`
  );

  return response.data.gifs.map((gif) => ({
    mediaType: MediaType.Video,
    sourceLink: `https://www.redgifs.com/watch/${gif.id}`,
    directLink: gif.urls.hd,
  }));
}
