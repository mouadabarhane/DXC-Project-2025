import { Schema, model } from "mongoose";
import IServiceOrderDocument from "./IServiceOrder";

const noteSchema = new Schema({
  text: { type: String, required: true, default: "" },
});

const relatedPartySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: false },
  "@referredType": {
    type: String,
    enum: ["Customer", "CustomerContact"],
    required: false,
  },
  "@type": { type: String, required: true, default: "RelatedParty" },
});

const orderRelationshipSchema = new Schema({
  id: { type: String, required: true },
  relationshipType: {
    type: String,
    enum: ["HasChild", "HasParent", "Requires"],
    required: true,
  },
});

const placeSchema = new Schema({
  id: { type: String, required: true, default: "" },
  "@type": { type: String, required: true, default: "Place" },
});

const serviceRelatedPartySchema = new Schema({
  email: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  phone: { type: String, required: false },
  "@referredType": {
    type: String,
    required: true,
    default: "OrderLineItemContact",
  },
  "@type": { type: String, required: true, default: "RelatedParty" },
});

const serviceRelationshipSchema = new Schema({
  id: { type: String, required: false },
  relationshipType: { type: String, required: false },
});

const serviceCharacteristicSchema = new Schema({
  name: { type: String, required: false },
  previousValue: { type: String, required: false },
  value: { type: String, required: false },
});

const serviceSpecificationSchema = new Schema({
  id: { type: String, required: true },
  internalVersion: { type: String, required: false },
  name: { type: String, required: false },
  version: { type: String, required: false },
  "@type": { type: String, required: true, default: "ServiceSpecificationRef" },
});

const serviceSchema = new Schema({
  id: { type: String, required: false },
  serviceCharacteristic: {
    type: Array(serviceCharacteristicSchema),
    required: false,
  },
  serviceRelationship: {
    type: Array(serviceRelationshipSchema),
    required: false,
  },
  serviceSpecification: { type: serviceSpecificationSchema, required: true },
  "@type": { type: String, required: true },
});

const serviceOrderItemSchema = new Schema({
  action: { type: String, enum: ["add", "change", "delete"], required: true },
  id: { type: String, required: true },
  orderRelationship: { type: Array(orderRelationshipSchema), required: true },
  place: { type: placeSchema, required: false },
  quantity: { type: Number, required: false, default: null },
  relatedParty: { type: serviceRelatedPartySchema, required: false },
  service: { type: serviceSchema, required: true },
  state: { type: String, required: true },
  "@type": { type: String, required: true, default: "ServiceOrderItem" },
});

const serviceOrderSchema = new Schema({
  externalId: { type: String, required: false },
  note: { type: Array(noteSchema), required: false },
  orderDate: { type: String, required: false },
  relatedParty: { type: Array(relatedPartySchema), required: false },
  requestedCompletionDate: { type: String, required: false, default: "" },
  requestedStartDate: { type: String, required: false, default: "" },
  serviceOrderItem: { type: Array(serviceOrderItemSchema), required: true },
  completionDate: { type: String, required: false, default: "" },
  expectedCompletionDate: { type: String, required: false, default: "" },
  status: { type: String, required: true },
  ponr: { type: String, required: true },
  "@type": { type: String, required: true, default: "ServiceOrder" },
});

const ServiceOrderModel = model<IServiceOrderDocument>(
  "ServiceOrder",
  serviceOrderSchema
);

export default ServiceOrderModel;
