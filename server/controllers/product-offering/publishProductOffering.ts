import { Request, Response } from "express";
import axios from "axios";
import DataModel from "../../models/data";
import * as dotenv from "dotenv";
const INSTANCE = process.env.INSTANCE_URL;
export default async function publishProductOffering(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.id; // Retrieve the id from route parameters
    console.log(id);

    const data = await DataModel.findOne({});

  const access_token = data.access_token;
  const payload = req.body;

    // Make the PATCH request to ServiceNow API
    const url = `${INSTANCE}.service-now.com/api/sn_prd_pm_adv/catalogmanagement/publish_product_offering/${id}`;

  
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: payload,

    };
   

    const offering = await axios.request(config)
    .then(response => {
      console.log({
        message: "Product offering has been published ",
      });
      return response.data;
    })
    .catch(error => {
      console.log({
        message: "Error occured when trying to publish product offering",
      },error);
      return { error };
    });

    if (offering.error) {
      res.status(500).send(
        JSON.stringify({
          message:
            "Error occured when publishing the product offering in the servicenow instance",
        }),
      );
    } else {
      res.status(201).send(
        JSON.stringify({
          message: "Product offering has been published in servicenow",
          productOffering : offering,
        }),
      );
    }

    

  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({
      message: "Internal server error - error while publishing product",
    });
  }
}
