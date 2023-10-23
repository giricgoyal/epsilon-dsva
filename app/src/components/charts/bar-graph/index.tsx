import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Props } from "./types";
import "./styles.scss";

const BarGraph = (props: Props) => {
  const { id, data, title, onClick = () => {}, selected } = props;
  const svgRef = useRef(null);

  useEffect(() => {
    const svg: any = d3.select(svgRef.current);
    const { width, height } = svg.node().getBoundingClientRect();

    const x: any = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([60, width - 20])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height - 80, 10]);

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("data-id", (d: any) => d.name)
      .attr("x", (d: any) => x(d.name))
      .attr("y", (d: any) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => height - 80 - y(d.value))
      .attr("fill", (d: any) =>
        !selected || d.name === selected ? "steelblue" : "lightblue"
      )
      .attr("class", "bar-rect")
      .on("click", (d: any) => {
        onClick(selected === d.target.dataset.id ? "" : d.target.dataset.id);
      });

    svg.selectAll("g#axis").remove();
    svg
      .append("g")
      .attr("id", "axis")
      .attr("transform", `translate(0, ${height - 80})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("word-break", "break-all")
      .style("width", 50)
      .attr("dx", "-.8em")
      .attr("dy", "-.8em")
      .attr("transform", "rotate(-90)");

    svg
      .append("g")
      .attr("id", "axis")
      .attr("transform", "translate(60,0)")
      .call(d3.axisLeft(y).ticks(5));
  }, [data]);

  return (
    <div id={id} className="bar-graph">
      <h4>{title}</h4>
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
};

export default BarGraph;
