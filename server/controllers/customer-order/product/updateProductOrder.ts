import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import ProductOrderModel from "../../../models/product-order/productOrder";

export default async function updateProductOrder(req: Request, res: Response) {
  const { id } = req.params;
  const mongodbId = new ObjectId(id);
  const updates = req.body;
  res.setHeader("Content-Type", "application/json");
  try {
    const productOrder = await ProductOrderModel.findByIdAndUpdate(
      mongodbId,
      updates,
      { new: true }
    );
    if (!productOrder) {
      return res.status(404).send(JSON.stringify({ error: "Product order not found" }));
    }
    res.status(200).send(JSON.stringify(productOrder));
  } catch (error) {
    res.status(500).send(JSON.stringify({ error }));
  }
}
