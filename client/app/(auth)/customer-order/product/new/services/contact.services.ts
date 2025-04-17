import axios from "axios";

import { getHeaders, url } from "./api";

// eslint-disable-next-line import/prefer-default-export
export const getContacts = (accountId: string) => {
  return axios.get(`${url}/now/contact?sysparm_query=account=${accountId}`, {
    headers: getHeaders(),
  });
};
