import { Request, Response } from "express";
import ServiceOrderModel from "../../../models/service-order/serviceOrder";

export default async function addServiceOrder(req: Request, res: Response) {
  try {
    const serviceOrderData = req.body;

    const serviceOrder = new ServiceOrderModel(serviceOrderData);

    const savedServiceOrder = await serviceOrder.save();

    res.status(201).json(savedServiceOrder);
  } catch (error) {
    res.status(500).send({ message: error });

    console.log("error: ", error);
  }
}
