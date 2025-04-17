import { Request, Response } from "express";
import DataModel from "../../models/data";
import { ObjectId } from "mongodb";
import axios from "axios";
import QueryString from "qs";
import * as dotenv from "dotenv";
const INSTANCE = process.env.INSTANCE_URL;
const USERNAME = process.env.SERVICENOW_USERNAME;
const PASSWORD = process.env.SERVICENOW_PASSWORD;

export default async function archiveProductOffering(
  req: Request,
  res: Response
) {
  const payload = req.body;
  const { id } = req.params;

  const data = await DataModel.findOne({});

  const access_token = data.access_token;

  let archivedProductOffering;
  const mongodbId: ObjectId = new ObjectId(data._id);

  res.setHeader("Content-Type", "application/json");

  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${INSTANCE}.service-now.com//api/sn_prd_pm_adv/catalogmanagement/archive_product_offering/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
       
      },
    };

    archivedProductOffering = await axios
      .request(config)
      .then((response) => {
        console.log({
          message: "Product Offering archived for the first try in servicenow",
        });
        return response.data;
      })
      .catch((error) => {
        console.log({
          message:
            "Product Offering not archived for the first try in servicenow",
        });
        return { error };
      });
    if (archivedProductOffering.error) {
      let oAuthData = QueryString.stringify({
        grant_type: "password",
        client_id: "f09185204c9e4210ed1c4c48b6ce7fb5",
        client_secret: "aYbu)M}$b^",
        username: `${USERNAME}`,
        password: `${PASSWORD}`,
      // username: "tec.user",  
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

      const newToken = await DataModel.findByIdAndUpdate(
        mongodbId,
        {
          access_token: tokens.access_token,
        },
        { new: true }
      );

      config.headers.Authorization = `Bearer ${newToken.access_token}`;

      archivedProductOffering = await axios
        .request(config)
        .then((response) => {
          console.log({
            message:
              "Product Offering archived for the second try in servicenow",
          });
          return response.data;
        })
        .catch((error) => {
          console.log({
            message:
              "Product Offering not archived for the second try in servicenow",
          });
          return { error };
        });
      if (archivedProductOffering.error) {
        res.status(500).send(
          JSON.stringify({
            message:
              "Error occured while archiving the product offering in the servicenow instance",
          })
        );
      } else {
        res.status(201).send(
          JSON.stringify({
            message: "Product Offering archived in servicenow",
          })
        );
      }
    } else {
      res.status(201).send(
        JSON.stringify({
          message: "Product Offering archived in servicenow",
        })
      );
    }
  } catch (error) {
    return { error };
  }
}
