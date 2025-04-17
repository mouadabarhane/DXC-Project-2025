import axios from "axios";

import { getHeaders, url } from "./api";


export const getAllProductOfferings = () => {
  return axios.get(`${url}/sn_prd_pm_adv/catalogmanagement/productoffering`, {
    headers: getHeaders(),
  });
};

export const getCharacteristicsByOfferingId = (offeringId: string) => {
  return axios.get(
    `${url}/now/table/sn_prd_pm_product_offering_characteristic?sysparm_query=product_offering=${encodeURI(
      offeringId,
    )}`,
    {
      headers: getHeaders(),
    },
  );
};

const getSysParameterQuery = (locationIds: Array<string>) => {
  //sys_id=0002c0a93790200044e0bfc8bcbe5df5^NQsys_id=0594ed7437d0200044e0bfc8bcbe5df0
  const value = locationIds.map((id) => `sys_id=${id}`).join("^NQ");
  return `sysparm_query=${encodeURI(value)}`;
};

export const getCharacteristicsByIds = (characteristicsIds: Array<string>) => {
  return axios.get(
    `${url}/now/table/sn_prd_pm_characteristic?${getSysParameterQuery(
      characteristicsIds,
    )}`,
    {
      headers: getHeaders(),
    },
  );
};
