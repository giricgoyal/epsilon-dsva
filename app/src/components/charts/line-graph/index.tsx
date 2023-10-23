import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Props } from "./types";
import "./styles.scss";

function LineGraph(props: Props) {
  const { data, title } = props;
  const svgRef = useRef(null);

  useEffect(() => {
    const svg: any = d3.select(svgRef.current);

    const { width, height } = svg.node().getBoundingClientRect();

    const x: any = d3
      .scalePoint()
      .domain(data.map((d) => d.name))
      .range([60, width - 20]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height - 80, 10]);

    const line: any = d3
      .line()
      .x((d: any) => x(d.name))
      .y((d: any) => y(d.value));

    svg.selectAll("path").remove();
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line)
      .attr("transform", `translate(0, 0)`);

    svg.selectAll("g").remove();
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 80})`)
      .call(d3.axisBottom(x));

    svg.append("g").attr("transform", "translate(60,0)").call(d3.axisLeft(y));
  }, [data]);

  return (
    <div className="line-graph">
      <h4>{title}</h4>
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
}

export default LineGraph;
