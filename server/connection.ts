import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

export default async function Connection() {
  const connection = await mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("Connected to the database"))
    .catch((e) => console.log(e));
  return connection;
}
