import { ObjectId } from "mongodb";
import IncidentModel from "../../models/incident";
import { Request, Response } from "express";

export default async function updateIncident(req: Request, res: Response) {
  const { id } = req.params;
  const mongodbId = new ObjectId(id);
  const updates = req.body;
  res.setHeader("Content-Type", "application/json");
  try {
    const incident = await IncidentModel.findByIdAndUpdate(mongodbId, updates, {
      new: true,
    });
    res.status(200).send(JSON.stringify(incident));
  } catch (error) {
    res.status(500).send(JSON.stringify({ error }));
  }
}
