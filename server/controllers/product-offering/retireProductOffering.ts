import { Request, Response } from "express";
import DataModel from "../../models/data";
import { ObjectId } from "mongodb";
import axios from "axios";
import QueryString from "qs";
import * as dotenv from "dotenv";
const INSTANCE = process.env.INSTANCE_URL;

export default async function retireProductOffering(
  req: Request,
  res: Response
) {
  const { id } = req.params;

  try {
    const data = await DataModel.findOne({});
    if (!data) {
      return res.status(404).send({ message: "Data not found" });
    }

    const access_token = data.access_token;
    const mongodbId: ObjectId = new ObjectId(data._id);
    res.setHeader("Content-Type", "application/json");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${INSTANCE}.service-now.com/api/sn_prd_pm_adv/catalogmanagement/retire_product_offering/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    let retiredProductOffering: any;

    try {
      retiredProductOffering = await axios.request(config);
      console.log({
        message: "Product Offering retired on the first try in ServiceNow",
        data: retiredProductOffering.data,
      });
    } catch (error: any) {
      console.error("First attempt failed", error.response ? error.response.data : error.message);
      retiredProductOffering = { error: true };
    }

    if (retiredProductOffering.error) {
      const oAuthData = QueryString.stringify({
        grant_type: "password",
        client_id: "f09185204c9e4210ed1c4c48b6ce7fb5",
        client_secret: "aYbu)M}$b^",
        username: "tec.user",
        password: "&@gA3nXzD)%lmi9PW6bmDyXK}uN{&VbJZ!>DkIrR!PH>]:G1J:EToG]WOS6lxyF?%:f%hu!9G_gpHA!4vGh:@.UBc^f!bb{w4;w:",
      });

      const oAuthTokenConfig = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${INSTANCE}.service-now.com/oauth_token.do`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: oAuthData,
      };

      let tokens: any;
      try {
        tokens = await axios.request(oAuthTokenConfig);
        console.log({ message: "New token generated", data: tokens.data });
      } catch (error: any) {
        console.error("Token generation failed", error.response ? error.response.data : error.message);
        return res.status(500).send({ message: "Error while trying to generate a new token" });
      }

      const newToken = await DataModel.findByIdAndUpdate(
        mongodbId,
        { access_token: tokens.data.access_token },
        { new: true }
      );

      config.headers.Authorization = `Bearer ${newToken?.access_token}`;

      try {
        retiredProductOffering = await axios.request(config);
        console.log({
          message: "Product Offering retired on the second try in ServiceNow",
          data: retiredProductOffering.data,
        });
      } catch (error: any) {
        console.error("Second attempt failed", error.response ? error.response.data : error.message);
        return res.status(500).send({
          message: "Error occurred while retiring the product offering in the ServiceNow instance",
        });
      }
    }

    res.status(201).send({ message: "Product Offering retired in ServiceNow" });

  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).send({ message: "Internal server error - Error while retiring Product Offering" });
  }
}
