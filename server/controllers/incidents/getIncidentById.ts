import { ObjectId } from "mongodb";
import IncidentModel from "../../models/incident";
import { Request, Response } from "express";

export default async function getIncidentById(req: Request, res: Response) {
  try {
    const incidentId = req.params.id;
    const mongodbId = new ObjectId(incidentId); 
    // Find the incident by ID in the database
    const incident = await IncidentModel.findById(mongodbId);

    if (incident) {
      // If the incident with the specified ID doesn't exist, return a 404 response
     
      res.status(200).json(incident);
    
    }else{
      res.status(404).json({ error: "Incident not found" });
    }

    
    
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error("Error retrieving incident:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
