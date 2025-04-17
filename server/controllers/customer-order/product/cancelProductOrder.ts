import { Request, Response } from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import { ObjectId } from "mongodb";
import DataModel from "../../../models/data";
import qs from "qs";
const INSTANCE = process.env.INSTANCE_URL;

export default async function cancelProductOrder(req: Request, res: Response) {
  const payload = req.body;

  const data = await DataModel.findOne({});

  const access_token = data.access_token;

  const mongodbId: ObjectId = new ObjectId(data._id);

  let canceledProductOrder;

  res.setHeader("Content-Type", "application/json");

  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${INSTANCE}.service-now.com/api/sn_ind_tmt_orm/cancelproductorder`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
       
      },
      data: payload,
    };

    canceledProductOrder = await axios
      .request(config)
      .then((response) => {
        console.log({
          message: "Product Order canceled for the first try in servicenow",
        });
        return response.data;
      })
      .catch((error) => {
        console.log({
          message: "Product Order not canceled for the first try in servicenow",
        });
        return { error };
      });
    if (canceledProductOrder.error) {
      let oAuthData = qs.stringify({
        grant_type: "password",
        client_id: "f09185204c9e4210ed1c4c48b6ce7fb5",
        client_secret: "aYbu)M}$b^",
        username: "tec.user",
        password:
          "&@gA3nXzD)%lmi9PW6bmDyXK}uN{&VbJZ!>DkIrR!PH>]:G1J:EToG]WOS6lxyF?%:f%hu!9G_gpHA!4vGh:@.UBc^f!bb{w4;w:",
      });

      let oAuthTokenConfig = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${INSTANCE}.service-now.com/oauth_token.do`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
         
        },
        data: oAuthData,
      };

      const tokens = await axios
        .request(oAuthTokenConfig)
        .then((response) => {
          console.log({ message: "New token generated" });
          return response.data;
        })
        .catch((error) => {
          return { error };
        });

      if (tokens.error) {
        res.status(500).send(
          JSON.stringify({
            message: "Error while trying to generate a new token",
          })
        );
      }

      // const oldToken = await DataModel.findOne({ access_token: access_token });
     // const mongodbId = new ObjectId(oldToken._id);

      const newToken = await DataModel.findByIdAndUpdate(
        mongodbId,
        {
          access_token: tokens.access_token,
        },
        { new: true }
      );

      config.headers.Authorization = `Bearer ${newToken.access_token}`;


      canceledProductOrder = await axios
        .request(config)
        .then((response) => {
          console.log({
            message: "Product Order cancled for the second try in servicenow",
          });
          return response.data;
        })
        .catch((error) => {
          console.log({
            message:
              "Product Order not canceled for the second try in servicenow",
          });
          return { error };
        });
      if (canceledProductOrder.error) {
        res.status(500).send(
          JSON.stringify({
            message:
              "Error occured while canceling a product order in the servicenow instance",
          })
        );
      } else {
        res.status(201).send(
          JSON.stringify({
            message: "Product Order canceled in servicenow",
            productOrder: canceledProductOrder,
          })
        );
      }
    } else {
      res.status(201).send(
        JSON.stringify({
          message: "Product Order canceled in servicenow",
          productOrder: canceledProductOrder,
        })
      );
    }
  } catch (error) {
    return { error };
  }
}
