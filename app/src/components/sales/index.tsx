import { useCallback, useEffect, useMemo, useState } from "react";
import ButtonGroup from "../ui-elements/button-group";
import { Props } from "./types";
import {
  getPurchasesData,
  getPurchasesDataByMonth,
} from "../../common/endpoints/purchases";
import BarGraph from "../charts/bar-graph";
import { convertKeyValueToNameValueObject } from "../../common/helpers";
import "./styles.scss";
import GraphContainer from "../charts/container";
import LineGraph from "../charts/line-graph";
import { useFetch } from "../../common/hooks/use-fetch";

const Sales = (props: Props) => {
  const metricsButtons = [
    {
      label: "No of Orders",
      value: "no-of-orders",
    },
    {
      label: "Revenue",
      value: "revenue",
    },
    {
      label: "No of Units",
      value: "no-of-units",
    },
  ];

  const [selectedMetric, setSelectedMetric] = useState(metricsButtons[0].value);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [categoryData]: any = useFetch(
    () =>
      getPurchasesData("category", selectedMetric, {
        location: selectedLocation,
      }),
    [selectedLocation, selectedMetric]
  );

  const [subCategoryData]: any = useFetch(
    () =>
      getPurchasesData("subcategory", selectedMetric, {
        category: selectedCategory,
        location: selectedLocation,
      }),
    [selectedCategory, selectedLocation, selectedMetric]
  );

  const [locationData]: any = useFetch(
    () =>
      getPurchasesData("location", selectedMetric, {
        category: selectedCategory,
        subcategory: selectedSubCategory,
      }),
    [selectedCategory, selectedSubCategory, selectedMetric]
  );

  const [monthlyData]: any = useFetch(
    () =>
      getPurchasesDataByMonth(selectedMetric, {
        location: selectedLocation,
        category: selectedCategory,
        subcategory: selectedSubCategory,
      }),
    [selectedCategory, selectedLocation, selectedMetric, selectedSubCategory]
  );

  const handleMetricChange = useCallback((val: string) => {
    setSelectedMetric(val);
  }, []);

  const metricsLabel = useMemo(() => {
    return metricsButtons.find((b) => b.value === selectedMetric)?.label;
  }, [selectedMetric]);

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSubCategoryClick = useCallback((subcategory: string) => {
    setSelectedSubCategory(subcategory);
  }, []);

  const handleLocationClick = useCallback((location: string) => {
    setSelectedLocation(location);
  }, []);

  return (
    <div className="sales">
      <div className="sales__toolbar">
        <ButtonGroup buttons={metricsButtons} onClick={handleMetricChange} />
      </div>
      <div className="sales__graph-area">
        <GraphContainer>
          <BarGraph
            selected={selectedCategory}
            data={convertKeyValueToNameValueObject(categoryData.data)}
            title={`${metricsLabel} per category`}
            onClick={handleCategoryClick}
          />
        </GraphContainer>
        <GraphContainer>
          <BarGraph
            selected={selectedLocation}
            data={convertKeyValueToNameValueObject(locationData.data)}
            title={`${metricsLabel} by location`}
            onClick={handleLocationClick}
          />
        </GraphContainer>
        <GraphContainer>
          <BarGraph
            selected={selectedSubCategory}
            data={convertKeyValueToNameValueObject(subCategoryData.data)}
            title={`${metricsLabel} per subcategory`}
            onClick={handleSubCategoryClick}
          />
        </GraphContainer>
        <GraphContainer>
          <LineGraph
            data={convertKeyValueToNameValueObject(monthlyData.data)}
            title={`${metricsLabel} month over month`}
          />
        </GraphContainer>
      </div>
    </div>
  );
};

export default Sales;
