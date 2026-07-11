import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface D3MicroChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
  strokeWidth?: number;
}

export const D3MicroChart: React.FC<D3MicroChartProps> = ({
  data,
  width = 120,
  height = 40,
  color = '#6366f1', // default indigo
  fillOpacity = 0.2,
  strokeWidth = 2,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous renders

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const minData = d3.min(data) || 0;
    const maxData = d3.max(data) || 100;

    const yScale = d3.scaleLinear()
      .domain([minData * 0.9, maxData * 1.1]) // Add 10% padding
      .range([height, 0]);

    // Area Generator (for the gradient fill)
    const areaGenerator = d3.area<number>()
      .x((_, i) => xScale(i))
      .y0(height)
      .y1(d => yScale(d))
      .curve(d3.curveMonotoneX);

    // Line Generator (for the stroke)
    const lineGenerator = d3.line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    // Definitions for Gradient
    const defs = svg.append('defs');
    const gradientId = `gradient-${Math.random().toString(36).substring(7)}`;
    const gradient = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color)
      .attr('stop-opacity', fillOpacity);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', color)
      .attr('stop-opacity', 0);

    // Append Area
    svg.append('path')
      .datum(data)
      .attr('fill', `url(#${gradientId})`)
      .attr('d', areaGenerator);

    // Append Line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', strokeWidth)
      .attr('d', lineGenerator);

    // Append pulsing dot at the end
    svg.append('circle')
      .attr('cx', xScale(data.length - 1))
      .attr('cy', yScale(data[data.length - 1]))
      .attr('r', 3)
      .attr('fill', '#ffffff')
      .attr('stroke', color)
      .attr('stroke-width', 2);

  }, [data, width, height, color, fillOpacity, strokeWidth]);

  return (
    <div className="d3-micro-chart-container flex items-center justify-center">
      <svg ref={svgRef} width={width} height={height} overflow="visible" />
    </div>
  );
};
