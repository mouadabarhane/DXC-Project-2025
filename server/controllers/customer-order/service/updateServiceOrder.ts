import { Request, Response } from "express";
import ServiceOrderModel from "../../../models/service-order/serviceOrder";

export default async function updateServiceOrder(req: Request, res: Response) {
  try {
    const serviceId = req.query._id as string;
    const formData = req.body;

    console.log("console de serviceId", serviceId);

    console.log("req.body:", req.body);

    const updatedServiceOrder = await ServiceOrderModel.findByIdAndUpdate(
      serviceId,
      formData,
      { new: true }
    );
    console.log("formData:", formData);
    if (updatedServiceOrder) {
      return res
        .status(200)
        .send({ message: "Service Order updated successfully" });
    } else {
      return res.status(404).send({ message: "Service Order not found" });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ message: error });
  }
}
