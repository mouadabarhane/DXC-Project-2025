import axios from "axios";

import { getHeaders, url } from "./api";

export const getLocationsByAccountId = (id: string) => {
  return axios.get(
    `${url}/now/table/account_address_relationship?account=${id}`,
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

export const getLocationsWidthIds = (locationIds: Array<string>) => {
  return axios.get(
    `${url}/now/table/cmn_location?${getSysParameterQuery(locationIds)}`,
    {
      headers: getHeaders(),
    },
  );
};
