// eslint-disable-next-line import/no-named-as-default
import Axios from "axios";

import { NEW_API_URL } from "@/config";

export const axios = Axios.create({
  baseURL: NEW_API_URL,
});

axios.interceptors.response.use((response) => {
  return response.data;
});
