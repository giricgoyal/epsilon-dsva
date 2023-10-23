import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Props } from "./types";
import "./styles.scss";

function StackedAreaGraph(props: Props) {
  const { data } = props;
  const svgRef = useRef(null);

  useEffect(() => {
    // const data = [
    //   { label: "2020", category1: 10, category2: 20, category3: 15 },
    //   { label: "2021", category1: 15, category2: 25, category3: 20 },
    //   { label: "2022", category1: 20, category2: 30, category3: 25 },
    //   { label: "2023", category1: 25, category2: 35, category3: 30 },
    // ];
    const svg: any = d3.select(svgRef.current);

    const { width, height } = svg.node().getBoundingClientRect();

    const keys = data.length
      ? Object.keys(data[0]).filter((datum) => datum !== "label")
      : [];

    const stack: any = d3
      .stack()
      .keys(keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData: any = stack(data);

    const x = d3
      .scalePoint()
      .domain(data.map((d: any) => d.label))
      .range([60, width]);

    const yDomainMax: any = d3.max(stackedData, (d: any) =>
      d3.max(d, (d: any) => d[1])
    );
    const y: any = d3
      .scaleLinear()
      .domain([0, yDomainMax])
      .range([height - 80, 0]);

    const area: any = d3
      .area()
      .x((d: any): any => x(d.data.label))
      .y0((d) => y(d[0]))
      .y1((d) => y(d[1]));

    svg
      .selectAll("path")
      .data(stackedData)
      .join("path")
      .attr("fill", (d: any) => d3.schemeCategory10[keys.indexOf(d.key)])
      .attr("d", area);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 80})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", "translate(60,0)")
      .call(d3.axisLeft(y).ticks(5));
  }, [data]);

  return (
    <div className="stacked-area-graph">
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
}

export default StackedAreaGraph;
