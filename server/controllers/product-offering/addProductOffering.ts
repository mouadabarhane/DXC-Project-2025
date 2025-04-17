import { Request, Response } from "express";
import ProductOfferingModel from "../../models/product-offering/productOffering";
import axios from "axios";
import * as dotenv from "dotenv";
const INSTANCE = process.env.INSTANCE_URL;

export default async function addProductOffering(req: Request, res: Response) {
  let lastNumber = 0;
  try {
    // Generate the auto-incrementing number
 /*   const number = `DXC${lastNumber.toString().padStart(5, "0")}`;
    lastNumber = (lastNumber + 1) % 10001;

    // Create a new product using the request body data
    const product = new ProductOfferingModel({
      name: req.body.name,
      status: "draft",
      description: req.body.description,
      productOfferingPrice: [
        {
          price: {
            taxIncludedAmount: {
              unit: req.body.productOfferingPrice[0].price.taxIncludedAmount.unit,
              value: req.body.productOfferingPrice[0].price.taxIncludedAmount.value,
            },
          },
          priceType: req.body.productOfferingPrice[0].priceType,
        },
      ],
      productSpecification: req.body.productSpecification, // Save the selected product specification's sys_id
      category: req.body.category,
      channel: req.body.channel,
      validFor: {
        startDateTime: req.body.validFor.startDateTime,
        endDateTime: req.body.validFor.endDateTime,
      },
      prodSpecCharValueUse: req.body.prodSpecCharValueUse,
      number: number,
      id: "", // Placeholder for the actual _id value
      created: Date.now(),
      createdBy: req.body.createdBy,
    });

    // Save the product to the database
    const savedProduct = await product.save();
    // Update the "id" field with the actual _id value
    savedProduct.id = savedProduct._id;

    // Find the last inserted document with the "number" field
    const lastInsertedProduct = await ProductOfferingModel.findOne(
      { number: { $exists: true } },
      {},
      { sort: { _id: -1 } }
    );

    if (lastInsertedProduct && lastInsertedProduct.number) {
      // Extract the numeric portion of the last number and increment it
      const lastNumberValue = parseInt(lastInsertedProduct.number.slice(3), 10);

      if (!isNaN(lastNumberValue) && lastNumberValue < 10000) {
        // Increment the last number
        lastNumber = lastNumberValue + 1;
      }
    }

    // Save the product again with the updated "number"
    savedProduct.number = `DXC${lastNumber.toString().padStart(5, "0")}`;
    await savedProduct.save();

    */

    // Make the POST request to ServiceNow API
    const url = `${INSTANCE}.com/api/sn_prd_pm_adv/catalogmanagement/productoffering`;

    const auth = {
      username: "tec.user",
      password: "&@gA3nXzD)%lmi9PW6bmDyXK}uN{&VbJZ!>DkIrR!PH>]:G1J:EToG]WOS6lxyF?%:f%hu!9G_gpHA!4vGh:@.UBc^f!bb{w4;w:",
    };

    const payload = {
      name: req.body.name,
      description: req.body.description,
      version: "",
      validFor: req.body.validFor,
      productOfferingTerm: "12_months",
      productOfferingPrice: req.body.productOfferingPrice,
      productSpecification: req.body.productSpecification,
      prodSpecCharValueUse: req.body.prodSpecCharValueUse,
      channel: req.body.channel,
      category: req.body.category,
      externalId: "",
    };

    const response = await axios.post(url, payload, { auth });
    console.log("Response Data:", response.data);
    
    if (response.status === 200 || response.status === 201) {
      // Retrieve the sys_id from the response data
      const sysId = response.data.id;

     /* // Update the savedProduct document with the externalId
      savedProduct.externalId = sysId;
      await savedProduct.save();
      */
      console.log("Payload sent to ServiceNow successfully.");

      res.status(201).send({ message: "Product created successfully" });
      //console.log(savedProduct);

    } else {
      console.error("Failed to send payload to ServiceNow.", response.data);
      res.status(500).send({ message: "Failed to create product offering " });
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error - products" });
  }
}
