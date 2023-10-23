import { useEffect, useState } from "react";
import { Props } from "./types";
import {
  getAmountSpentByAgeGroup,
  getFavoriteColorData,
  getFavoriteFoodData,
  getFavoriteHobbyData,
  getFavoriteSportData,
  getPeopleCountByAgeGroup,
  getTotalNewReturningStats,
} from "../../common/endpoints/people";
import GraphContainer from "../charts/container";
import BarGraph from "../charts/bar-graph";
import { convertKeyValueToNameValueObject } from "../../common/helpers";
import "./styles.scss";
import { useFetch } from "../../common/hooks/use-fetch";
import PieChart from "../charts/pie-chart";
import StackedAreaGraph from "../charts/stacked-area-graph";
import { flattenTotalNewReturningStatsData } from "./helpers";

const Customers = (props: Props) => {
  const [peopleCountByAgeGroup]: any = useFetch(getPeopleCountByAgeGroup);
  const [amountSpentByAgeGroup]: any = useFetch(getAmountSpentByAgeGroup);
  const [totalNewReturningStats]: any = useFetch(getTotalNewReturningStats);
  const [favoriteFoodData]: any = useFetch(getFavoriteFoodData);
  const [favoriteColorData]: any = useFetch(getFavoriteColorData);
  const [favoriteHobbyData]: any = useFetch(getFavoriteHobbyData);
  const [favoriteSportData]: any = useFetch(getFavoriteSportData);

  return (
    <div className="customers">
      <div className="customers__graph-area">
        <div className="customers__graph-area__customers-data">
          <GraphContainer>
            <BarGraph
              data={convertKeyValueToNameValueObject(
                peopleCountByAgeGroup.data
              )}
              title="No. of customers per age group"
            />
          </GraphContainer>
          <GraphContainer>
            <BarGraph
              data={convertKeyValueToNameValueObject(
                amountSpentByAgeGroup.data
              )}
              title="Amount spent by customers per age group"
            />
          </GraphContainer>
        </div>
        <div className="customers__graph-area__pie-chart-column">
          <GraphContainer>
            <PieChart
              data={convertKeyValueToNameValueObject(favoriteColorData.data)}
            />
          </GraphContainer>
          <GraphContainer>
            <PieChart
              data={convertKeyValueToNameValueObject(favoriteFoodData.data)}
            />
          </GraphContainer>
          <GraphContainer>
            <PieChart
              data={convertKeyValueToNameValueObject(favoriteHobbyData.data)}
            />
          </GraphContainer>
          <GraphContainer>
            <PieChart
              data={convertKeyValueToNameValueObject(favoriteSportData.data)}
            />
          </GraphContainer>
        </div>
      </div>
    </div>
  );
};

export default Customers;
