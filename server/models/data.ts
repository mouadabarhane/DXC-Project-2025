import { Schema, model } from "mongoose";

interface IDataDocument {
  access_token: string;
  order_number: number;
}

const dataSchema = new Schema({
  access_token: { type: String, required: true },
  order_number: { type: String, required: true },
});

const DataModel = model<IDataDocument>("Data", dataSchema);

export default DataModel;
