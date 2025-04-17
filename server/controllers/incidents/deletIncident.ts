import IncidentModel from "../../models/incident";
import { Request, Response } from "express";
export default async function deletIncident(req: Request, res: Response) {
    try {
        const incidentId = req.params.id;
        //     // Find the incident by ID and delete it from the database
           const deletedIncident = await IncidentModel.findByIdAndDelete(incidentId);
        
            if (!deletedIncident) {
        //       // If the incident with the specified ID doesn't exist, return a 404 response
              return res.status(404).json({ error: 'Incident not found' });
      }
   // Return a success response
     return res.json({ message: 'Incident deleted successfully' });
   } catch (error) {
// Handle any errors that occur during the deletion process
     console.error('Error deleting incident:', error);
     return res.status(500).json({ error: 'Internal server error' });
   }
 };
     
  