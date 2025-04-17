import { Router } from "express";

import {
  getIncidents,
  getIncidentById,
  updateIncident,
} from "../controllers/incidents";
import deletIncident from "../controllers/incidents/deletIncident";

const incidentRouter = Router();

// GET /api/incidents
incidentRouter.get("/", getIncidents);

// GET /api/incidents/:id
incidentRouter.get("/:id", getIncidentById);

// PUT /api/incidents/:id
incidentRouter.patch("/:id", updateIncident);
// Delet
incidentRouter.delete("/:id", deletIncident);
export default incidentRouter;
