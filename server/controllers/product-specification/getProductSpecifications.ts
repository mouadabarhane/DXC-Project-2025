import { Request, Response } from "express";
import ProductSpecificationModel from "../../models/product-specification/productSpecification";
export default async function getProductSpecifications(
  req: Request,
  res: Response
) {
  try {
    const productSpecifications = await ProductSpecificationModel.find({});

    res.status(200).send(productSpecifications);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error - productspecifications" });
  }
}
