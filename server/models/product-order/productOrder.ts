import { Schema, model } from "mongoose";
import IProductOrderDocument from "./IProductOrder";

const channelSchema = new Schema({
  id: { type: String, required: true, default: "" },
  name: { type: String, required: false, default: "" },
});

const noteSchema = new Schema({
  text: { type: String, required: true, default: "" },
});

const taxIncludedAmoutSchema = new Schema({
  unit: { type: String, required: false },
  value: { type: Number, required: false },
});

const priceSchema = new Schema({
  taxIncludedAmout: { type: taxIncludedAmoutSchema, required: false },
});

const itemPriceSchema = new Schema({
  price: { type: priceSchema, required: false },
  priceType: { type: String, required: false },
  recurringChargePeriod: { type: String, required: false },
});

const placeSchema = new Schema({
  id: { type: String, required: true, default: "" },
  "@type": { type: String, required: true, default: "Place" },
});

const productCharacteristicSchema = new Schema({
  name: { type: String, required: false, default: "" },
  previousValue: { type: String, required: false, default: "" },
  value: { type: String, required: false, default: "" },
});

const productSpecificationSchema = new Schema({
  id: { type: String, required: true },
  internalVersion: { type: String, required: false },
  name: { type: String, required: false },
  version: { type: String, required: false },
  "@type": { type: String, required: true, default: "ProductSpecificationRef" },
});

const productRelatedPartySchema = new Schema({
  email: { type: String, required: false, default: "" },
  firstName: { type: String, required: false, default: "" },
  lastName: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  "@referredType": {
    type: String,
    required: true,
    default: "OrderLineItemContact",
  },
  "@type": { type: String, required: true },
});

const productSchema = new Schema({
  id: { type: String, required: false, default: "" },
  place: { type: placeSchema, required: false },
  productCharacteristic: {
    type: Array(productCharacteristicSchema),
    required: false,
  },
  productSpecification: { type: productSpecificationSchema, required: true },
  relatedParty: { type: Array(productRelatedPartySchema), required: false },
  "@type": { type: String, required: true },
});

const productOfferingSchema = new Schema({
  id: { type: String, required: true },
  internalVersion: { type: String, required: false },
  name: { type: String, required: false },
  version: { type: String, required: false },
});

const productOrderItemRelationshipSchema = new Schema({
  id: { type: String, required: true, default: "" },
  relationshipType: {
    type: String,
    enum: ["HasChild", "HasParent"],
    required: true,
  },
});

const productOrderItemSchema = new Schema({
  action: {
    type: String,
    enum: ["add", "change", "delete"],
    required: true,
    default: "",
  },
  id: { type: String, required: true, default: "" },
  itemPrice: { type: Array(itemPriceSchema), required: false },
  product: { type: productSchema, required: true },
  productOffering: { type: productOfferingSchema, required: true },
  productOrderItemRelationship: {
    type: Array(productOrderItemRelationshipSchema),
    required: true,
  },
  quantity: { type: Number, required: false, default: null },
  state: { type: String, required: false },
  "@type": { type: String, required: true, default: "ProductOrderItem" },
});

const relatedPartySchema = new Schema({
  id: { type: String, required: false },
  name: { type: String, required: false },
  "@referredType": {
    type: String,
    enum: ["Customer", "CustomerContact"],
    required: true,
  },
  "@type": { type: String, required: true, default: "RelatedParty" },
});

const soldProductsSchema = new Schema({
  orderLineID: { type: String, required: false },
  soldProductID: { type: String, required: false },
});

const productOrderSchema = new Schema({
  orderNumber: { type: String, required: true },
  channel: { type: Array(channelSchema), required: false },
  externalId: { type: String, required: true, default: "" },
  note: { type: Array(noteSchema), required: false },
  orderCurrency: { type: String, required: true },
  productOrderItem: { type: Array(productOrderItemSchema), required: true },
  relatedParty: { type: Array(relatedPartySchema), required: false },
  orderDate: { type: String, required: false },
  requestedCompletionDate: { type: String, required: false, default: "" },
  requestedStartDate: { type: String, required: false, default: "" },
  completionDate: { type: String, required: false, default: "" },
  expectedCompletionDate: { type: String, required: false, default: "" },
  state: { type: String, required: true, default: "draft" },
  createdBy: { type: String, required: true },
  created: { type: Date, required: true, default: Date.now() },
  ponr: { type: Boolean, required: false, default: false },
  soldProducts: { type: Array(soldProductsSchema), required: false },
  "@type": { type: String, required: true, default: "ProductOrder" },
  read: { type: Boolean, default: false },
});

const ProductOrderModel = model<IProductOrderDocument>(
  "ProductOrder",
  productOrderSchema
);

export default ProductOrderModel;
