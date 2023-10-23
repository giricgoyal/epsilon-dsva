export const flattenTotalNewReturningStatsData = (data: any = {}) => {
  const formattedData = Object.entries(data).map(
    ([key, value]: [any, any]) => ({
      label: key.split("-")[1],
      newCustomers: Number(
        ((value.newCustomers / value.totalCustomers) * 100).toFixed(2)
      ),
      //   returningCustomers: Number(
      //     ((value.returningCustomers / value.totalCustomers) * 100).toFixed(2)
      //   ),
    })
  );
  formattedData.sort((a, b) => (a.label > b.label ? 1 : -1));
  return formattedData;
};
