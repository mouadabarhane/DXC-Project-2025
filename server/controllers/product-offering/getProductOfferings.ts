import { Request, Response } from "express";

import ProductOfferingModel from "../../models/product-offering/productOffering";

export default async function getProductOfferings(req: Request, res: Response) {
  try {
    const po = await ProductOfferingModel.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(po));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
