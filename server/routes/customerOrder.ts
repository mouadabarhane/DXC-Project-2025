import { Router } from "express";
import {
  addProductOrder,
  addProductOrderToServiceNow,
  addServiceOrder,
  cancelProductOrder,
  getCustomerOrderById,
  getCustomerOrders,
  getProductOrderById,
  getProductOrders,
  getServiceOrderById,
  getServiceOrders,
  updateProductOrder,
  updateServiceOrder,
  updateProductOrderToServiceNow,
} from "../controllers/customer-order";

const customerOrderRoute = Router();

customerOrderRoute.get("/", getCustomerOrders);

customerOrderRoute.get("/all/:id", getCustomerOrderById);

customerOrderRoute.get("/product", getProductOrders);

customerOrderRoute.get("/product/:id", getProductOrderById);

customerOrderRoute.get("/service", getServiceOrders);

customerOrderRoute.get("/service/:id", getServiceOrderById);

customerOrderRoute.post("/product", addProductOrder);

customerOrderRoute.post("/service", addServiceOrder);

customerOrderRoute.post("/product/servicenow", addProductOrderToServiceNow);

customerOrderRoute.patch("/product/servicenow/:id", updateProductOrderToServiceNow);

customerOrderRoute.patch("/product/:id", updateProductOrder);

customerOrderRoute.patch("/service/:id", updateServiceOrder);

customerOrderRoute.post("/product/cancel", cancelProductOrder);


export default customerOrderRoute;
