import axios from "axios";
import * as dotenv from "dotenv";

import { TCategory, TChannel, TSelectedProductSpec } from "../types";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const fetchProductSpecificationDetails = async (
  setSelectedProductSpec: (
    value: React.SetStateAction<TSelectedProductSpec | null>,
  ) => void,
  setCategory: (value: React.SetStateAction<TCategory | null>) => void,
  setChannel: (value: React.SetStateAction<TChannel[] | null>) => void,
  chosenProductSpecification: string,
) => {
  try {
    const specificationUrl = `${AXIOS_URL}/api/product-specification/id/${chosenProductSpecification}`;
    const specificationResponse = await axios.get(specificationUrl);
    const specificationData = await specificationResponse.data;
    setSelectedProductSpec(specificationData);
    setCategory({
      id: specificationData.category.id,
      name: specificationData.category.name,
    });
    setChannel(specificationData.channel || []);
  } catch (err) {
    console.error(err);
  }
};

export default fetchProductSpecificationDetails;
