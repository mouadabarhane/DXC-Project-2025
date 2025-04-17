import axios from "axios";

import { getHeaders, url } from "./api";

const serverUrl = process.env.NEXT_PUBLIC_AXIOS_URL;

export const createOrder = (body: any) => {
  // return axios.post(`${url}/sn_ind_tmt_orm/order/productOrder`, body, {
  //   headers: getHeaders(),
  // });
  return axios.post(
    `${serverUrl}/api/customer-order/product/servicenow`,
    body,
    {
      headers: getHeaders(),
    },
  );
};

export const updateOrder = (id: string, body: any) => {
  // return axios.post(`${url}/sn_ind_tmt_orm/order/productOrder/${id}`, body, {
  //   headers: getHeaders(),
  // });
  return axios.post(
    `${serverUrl}/api/customer-order/product/servicenow/${id}`,
    body,
    {
      headers: getHeaders(),
    },
  );
};
