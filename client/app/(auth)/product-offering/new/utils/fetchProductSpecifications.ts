import axios from "axios";
import * as dotenv from "dotenv";

import { TProductSpecification } from "../types";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const fetchProductSpecifications = async (
  setProductSpecifications: (
    value: React.SetStateAction<TProductSpecification[]>,
  ) => void,
) => {
  try {
    const url = `${AXIOS_URL}/api/product-specification`;
    const response = await axios.get(url);
    const data = await response.data;
    setProductSpecifications(data);
  } catch (error) {
    console.error(error);
  }
};

export default fetchProductSpecifications;
