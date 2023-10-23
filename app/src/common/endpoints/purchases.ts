import { getQueryStringFromObject } from "../helpers";
import { getData } from "./api";

export const getPurchasesData = async (
  segment: string,
  metric: string,
  queryParams: { [key: string]: any } = {}
) => {
  const queryString = getQueryStringFromObject(queryParams);
  return getData(`purchases/${metric}/${segment}?${queryString}`);
};

export const getPurchasesDataByMonth = async (
  metric: string,
  queryParams: { [key: string]: any } = {}
) => {
  const queryString = getQueryStringFromObject(queryParams);
  return getData(`purchases/by-month/${metric}?${queryString}`);
};
