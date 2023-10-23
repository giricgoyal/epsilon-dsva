export const getClassName = (classNamesObject: { [key: string]: boolean }) => {
  return Object.entries(classNamesObject)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(" ");
};

export const convertKeyValueToNameValueObject = (
  data: {} = {}
): { name: string; value: any }[] => {
  return Object.entries(data).map(([key, value]) => ({
    name: key,
    value,
  }));
};

export const getQueryStringFromObject = (params: { [key: string]: any }) => {
  return Object.entries(params)
    .reduce((accum: string[], [key, value]) => {
      if (value) {
        accum.push(`${key}=${value}`);
      }

      return accum;
    }, [])
    .join("&");
};
