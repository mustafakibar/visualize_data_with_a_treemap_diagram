/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import * as d3 from 'd3';

(async function renderChart() {
  const data = await d3.json(
    'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json'
  );

  const dataset = data;

  const width = 1200;
  const height = width * 0.45;
  const margin = {
    top: 30,
    right: 30,
    bottom: 70,
    left: 160,
  };

  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.left + margin.bottom)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', `${0} ${0} ${width} ${height}`)
    .attr('transform', 'translate(0, 32)')
    .append('g');

  const tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip');

  const treemap = d3.treemap().size([width, height]).paddingInner(1);
  const color = d3.scaleOrdinal(d3.schemeSet1);

  const root = d3
    .hierarchy(dataset)
    .eachBefore((d) => {
      d.data.id = (d.parent ? `${d.parent.data.id}.` : '') + d.data.name;
    })
    .sum((d) => d.value)
    .sort((a, b) => b.height - a.height || b.value - a.value);

  treemap(root);

  const cell = svg
    .selectAll('g')
    .data(root.leaves())
    .enter()
    .append('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  const createTooltipText = (name, category, value) =>
    `Name: ${name}<i>(${category})</i><br><b>Value: ${value}</b>`;

  cell
    .append('rect')
    .attr('id', (d) => d.data.id)
    .attr('class', 'tile')
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('data-name', (d) => d.data.name)
    .attr('data-category', (d) => d.data.category)
    .attr('data-value', (d) => d.data.value)
    .attr('fill', (d) => color(d.data.category))
    .on('mouseover', (event, i) => {
      tooltip.transition().duration(500).style('opacity', 1);
      tooltip
        .html(createTooltipText(i.data.name, i.data.category, i.data.value))
        .style('left', `${event.pageX + 16}px`)
        .style('top', `${event.pageY}px`)
        .attr('data-value', i.data.value);
    })
    .on('mouseout', (_) =>
      tooltip.transition().duration(250).style('opacity', 0)
    );

  cell
    .append('text')
    .attr('class', 'tile-text')
    .selectAll('tspan')
    .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter()
    .append('tspan')
    .attr('x', 4)
    .attr('y', (_, i) => 16 * (i + 1))
    .text((d) => d);

  const legendRect = { width: 16, height: 16 };

  const legendSvg = svg.append('g').attr('id', 'legend');

  legendSvg
    .append('rect')
    .attr('y', height)
    .attr('width', width)
    .attr('height', legendRect.height * 3)
    .attr('fill', 'whitesmoke')
    .attr('opacity', '0.95');

  legendSvg
    .append('g')
    .selectAll('rect')
    .attr('id', 'legend')
    .data(dataset.children)
    .enter()
    .append('rect')
    .attr('class', 'legend-item')
    .attr('y', height + legendRect.height)
    .attr('x', (_d, i) => i * 120 + legendRect.width * 10)
    .attr('width', legendRect.width)
    .attr('height', legendRect.height)
    .attr('fill', (d) => color(d.name));

  legendSvg
    .append('g')
    .selectAll('text')
    .data(dataset.children)
    .enter()
    .append('text')
    .attr('class', 'legend-text')
    .attr('y', height + legendRect.height + 12)
    .attr('x', (_d, i) => i * 120 + legendRect.width * 11.5)
    .text((d) => d.name);
})();
