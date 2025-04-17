import axios from "axios";

import { getHeaders, url } from "./api";

/* to get only account that has a primary contact
*/
const encodedQuery = "primary_contactISNOTEMPTY";

// eslint-disable-next-line import/prefer-default-export
export const getAccountById = (id: string) => {
  return axios.get(`${url}/now/account/${id}`, {
    headers: getHeaders(),
  });
};

export const getAccounts = () => {
  return axios.get(`${url}/now/table/customer_account?sysparm_query=${encodedQuery}` , {
    headers: getHeaders(),
  })
}
