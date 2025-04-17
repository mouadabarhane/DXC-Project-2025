import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const retireProductOffering = (id: string) => {
  try {
    axios
      .patch(`${AXIOS_URL}/api/product-offering/retire/${id}`)
      .then(() => console.log("Product Offering has been retire"))
      .catch(() =>
        console.log("There was an error while retiring the product offering"),
      );
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  } catch (e) {
    console.log(e);
  }
};

export default retireProductOffering;
