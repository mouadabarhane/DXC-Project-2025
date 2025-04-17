import { Request, Response } from "express";
import ProductOrderModel from "../../../models/product-order/productOrder";

export default async function getProductOrders(req: Request, res: Response) {
  try {
    const productOrders = await ProductOrderModel.find();

    res.setHeader("Content-Type", "application/json");
    res.setHeader("x-Total-Count", productOrders.length);
    res.status(200).send(JSON.stringify(productOrders));
  } catch (error) {
    console.error("Error retrieving product orders:", error);
    res.status(500).send("Internal Server Error");
  }
}
