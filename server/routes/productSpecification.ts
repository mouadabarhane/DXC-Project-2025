import { Router } from "express";
import {
  getProductSpecByInternalId,
  getProductSpecificationById,
  getProductSpecifications,
} from "../controllers/product-specification";

const productSpecRoute = Router();

productSpecRoute.get("/", getProductSpecifications);

productSpecRoute.get("/id/:id", getProductSpecificationById);

productSpecRoute.get("/internalId/:id", getProductSpecByInternalId);

export default productSpecRoute;
