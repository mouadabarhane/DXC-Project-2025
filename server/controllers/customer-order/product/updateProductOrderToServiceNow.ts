import { Request, Response } from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import qs from "qs";

import DataModel from "../../../models/data";

const INSTANCE = process.env.INSTANCE_URL;

//const COOKIE =
  //"BIGipServerpool_dev174830=495998730.35134.0000; JSESSIONID=A2E08104C4CC46B511A35B4E0CCF4EC5; glide_session_store=8D9179DB97EFAD10720F7A200153AFC8; glide_user_route=glide.dcbc4af8666824ee4372a55062687d69";

const oAuthData = qs.stringify({
  grant_type: "password",
  client_id: "f09185204c9e4210ed1c4c48b6ce7fb5",
  client_secret: "aYbu)M}$b^",
  username: "tec.user",
  password:
    "&@gA3nXzD)%lmi9PW6bmDyXK}uN{&VbJZ!>DkIrR!PH>]:G1J:EToG]WOS6lxyF?%:f%hu!9G_gpHA!4vGh:@.UBc^f!bb{w4;w:",
});

const oAuthTokenConfig = {
  method: "post",
  maxBodyLength: Infinity,
  url: `${INSTANCE}/oauth_token.do`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
   
  },
  data: oAuthData,
};

const getUpdateProductOrderToServiceNowConfig = (id, token, payload) => {
  return {
    method: "post",
    maxBodyLength: Infinity,
    url: `${INSTANCE}/api/sn_ind_tmt_orm/order/productOrder/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
     
    },
    data: payload,
  };
};

export default async function updateProductOrderToServiceNow(
  req: Request,
  res: Response,
) {
  try {
    const id = req.body.id;
    const payload = req.body.data;

    // get access_token from mongodb
    const data = await DataModel.findOne({});
    const access_token = data.access_token;

    try {
      // first, we try with the access_token from mongodb
      const response = await axios.request(
        getUpdateProductOrderToServiceNowConfig(id, access_token, payload),
      );

      // if no error catched, we return success and data
      return res.status(200).json({ message: "success", data: response.data });
    } catch (error) {
      // if error catched, we generate new access_token
      const response2 = await axios.request(oAuthTokenConfig);
      const access_token2 = response2.data;

      // then we try again with the new access_token
      const response3 = await axios.request(
        getUpdateProductOrderToServiceNowConfig(id, access_token2, payload),
      );

      // if no error catched, we return success and data
      return res.status(200).json({ message: "success", data: response3.data });
    }
  } catch (error) {
    console.error("updateProductOrderToServiceNow", error);
    return res.status(500).json({ message: "an error occured" });
  }
}
