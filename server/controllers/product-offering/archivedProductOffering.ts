import { Request, Response } from "express";
import ProductOfferingModel from "../../models/product-offering/productOffering";
export default async function getArchivedProductOfferings(
  req: Request,
  res: Response
) {
  try {
    const productOfferings = await ProductOfferingModel.find({
      status: "archived",
    });
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Total-Count", productOfferings.length);
    res.status(200).send(productOfferings);
  } catch (error) {
    res.status(500).send({
      message: "Internal server error - getArchivedProductOfferings",
      error,
    });
  }
}
