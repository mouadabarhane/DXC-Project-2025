import { Request, Response } from "express";
import ProductSpecificationModel from "../../models/product-specification/productSpecification";

export default async function getProductSpecByInternalId(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  res.setHeader("Content-Type", "application/json");
  try {
    const productSpecification = await ProductSpecificationModel.find({
      // temporary , if collection fixed it should be id ...
      sys_id: id,
    });
    if (!productSpecification) {
      res
        .status(404)
        .send(JSON.stringify({ message: "Product Specification not found" }));
    } else {
      if (productSpecification.length === 1) {
        res
          .status(200)
          .send(
            JSON.stringify({ productSpecification: productSpecification[0] })
          );
      } else {
        res.status(200).send(
          JSON.stringify({
            productSpecification: productSpecification[0],
            message:
              "There are more than one product specification with the ID: " +
              id,
          })
        );
      }
    }
  } catch (exception) {
    res.status(500).send({ exception });
  }
}
