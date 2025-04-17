import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

export default async function getAccount(
  id: string,
  setAccount: React.Dispatch<any>,
) {
  try {
    const response = await axios.get(`${AXIOS_URL}/api/account/${id}`);
    const AccountData = response.data;
    // console.log(response.data);
    setAccount(AccountData);
  } catch (error) {
    console.error("Error while fetching account:", error);
  }
}
