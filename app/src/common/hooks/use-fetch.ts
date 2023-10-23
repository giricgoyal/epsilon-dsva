import { useEffect, useState } from "react";

export const useFetch = (fetchFn: Function, dependencyArray: any = []) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const data = await fetchFn();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, dependencyArray);

  return [data];
};
