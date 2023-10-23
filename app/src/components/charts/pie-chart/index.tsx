import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Props } from "./types";

function PieChart(props: Props) {
  const { data } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg: any = d3.select(svgRef.current);
    const { height, width } = svg.node().getBoundingClientRect();
    const radius = Math.min(width, height) / 2;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain([0, data.length]);

    const arcGenerator: any = d3.arc().innerRadius(0).outerRadius(radius);

    const pieGenerator: any = d3
      .pie()
      .padAngle(0)
      .value((d: any) => d.value);

    const arc: any = g.selectAll().data(pieGenerator(data)).enter();

    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_: any, i: any) => colorScale(i))
      .style("stroke", "#ffffff")
      .style("stroke-width", 0);

    arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d: any) => d.name)
      .style("fill", "#ffffff")
      .attr("transform", (d: any) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }, [data]);

  return (
    <div className="pie-chart">
      <svg ref={svgRef} height="100%" width="100%"></svg>
    </div>
  );
}

export default PieChart;
