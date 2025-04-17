import mongoose, { Schema, Document } from "mongoose";
import IAccountDocument from "./IAccount";

const AccountSchema = new Schema<IAccountDocument>({
  id: { type: String, required: true },
  country: { type: String, required: true },
  notes: { type: String, default: null },
  stock_symbol: { type: String, default: null },
  number: { type: String, required: true },
  sys_updated_by: { type: String, required: true },
  sys_created_on: { type: String, required: true },
  contact: { type: String, default: null },
  stock_price: { type: Number, default: null },
  state: { type: String, default: null },
  sys_created_by: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, required: true },
  fax_phone: { type: String, default: null },
  name: { type: String, required: true },
  account_code: { type: String, required: true },
  primary: { type: Boolean, required: true },
  city: { type: String, required: true },
  sys_class_name: { type: String, required: true },
  manufacturer: { type: Boolean, required: true },
  street: { type: String, required: true },
  vendor: { type: Boolean, required: true },
  theme: { type: String, default: null },
  vendor_type: { type: String, default: null },
  sn_ind_tsm_core_external_id: { type: String, default: null },
  website: { type: String, default: null },
  registration_code: { type: String, required: true },
  customer: { type: Boolean, required: true },
});

const AccountModel = mongoose.model<IAccountDocument>("Account", AccountSchema);

export default AccountModel;
