import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const archiveProductOffering = (id: string) => {
  try {
    axios
      .post(`${AXIOS_URL}/api/product-offering/archive/${id}`)
      .then(() => console.log("Product Offering has been archived"))
      .catch(() =>
        console.log("There was an error while archiving the product offering"),
      );
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  } catch (e) {
    console.log(e);
  }
};

export default archiveProductOffering;
