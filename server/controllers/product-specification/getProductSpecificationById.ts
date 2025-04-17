import { Request, Response } from "express";
import ProductSpecificationModel from "../../models/product-specification/productSpecification";
import { ObjectId } from "mongodb";

export default async function getProductSpecificationById(
  req: Request,
  res: Response
) {
  try {
    const mongodbId = new ObjectId(req.params.id);
   // console.log("from getProductSpecificationByiD :", mongodbId);
    const productSpecificationId = mongodbId ;
    const productSpecification = await ProductSpecificationModel.findById(
      productSpecificationId
    );

    if (!productSpecification) {
      return res
        .status(404)
        .send({ message: "Product specification not found" });
    }

    res.status(200).send(productSpecification);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Internal server error - productspecifications" });
  }
}
