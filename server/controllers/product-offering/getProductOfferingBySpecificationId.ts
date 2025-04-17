import { Request, Response } from "express";
import ProductOfferingModel from "../../models/product-offering/productOffering";

export default async function getProductOfferingBySpecificationId(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  try {
    const productOffering = await ProductOfferingModel.findById(id);
    res.setHeader("Content-Type", "application/json");
    if (productOffering) {
      const specificationId = productOffering.productSpecification.id;
      console.log(specificationId);
      res.status(200).send(JSON.stringify(productOffering));
    } else {
      res.status(404).send(
        JSON.stringify({
          message: "No product offering with ID: " + id,
        })
      );
    }
  } catch (error) {
    res.status(500).send(JSON.stringify({ error }));
  }
}
