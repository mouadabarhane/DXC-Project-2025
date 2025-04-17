import IncidentModel from "../../models/incident";
import { Request, Response } from "express";
export default async function getIncident(req: Request, res: Response) {
  try {
    const incidents = await IncidentModel.find({});

    res.status(200).send(incidents);
  } catch (error) {
    res.status(500).send({ message: "Internal server error - incidents" });
  }
}
