import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const publishProductOffering = async (id: string) => {
  try {
    const response = await axios.patch(
      `${AXIOS_URL}/api/product-offering/publish/servicenow/${id}`,
    );
    if (response.status === 200) {
      console.log("Product Offering has been published");
      //Anass: Consider updating UI here instead of reloading the page
    } else {
      console.error(
        "Failed to publish product offering. Status:",
        response.status,
      );
    }
  } catch (error) {
    console.error("Error publishing product offering:", error.message);
    //Anasss: Handle error appropriately, e.g., show a user-friendly error messsage
  }
};

export default publishProductOffering;
