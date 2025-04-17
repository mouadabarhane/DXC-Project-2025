import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

export default async function getProductSpecifications(
  setProductSpecfications: React.Dispatch<React.SetStateAction<never[]>>,
) {
  try {
    const response = await axios.get(`${AXIOS_URL}/api/product-specification`);
    const specificationData = response.data;
    setProductSpecfications(specificationData);
    console.log("hello", specificationData);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
  }
}
