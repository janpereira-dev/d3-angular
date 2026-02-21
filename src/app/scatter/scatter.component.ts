import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-scatter',
    templateUrl: './scatter.component.html',
    styleUrls: ['./scatter.component.css'],
    standalone: false
})
export class ScatterComponent implements OnInit {

  private data = [
    {City: 'Caracas', Population: 1600000, Census: 2020},
    {City: 'Valencia', Population: 900000, Census: 2019},
    {City: 'Marcaibo', Population: 500000, Census: 2020},
    {City: 'Yaracuy', Population: 100000, Census: 2019},
    {City: 'Mérida', Population: 75000, Census: 2020},
    {City: 'Vargas', Population: 50000, Census: 2020}
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }

  private createSvg(): void {
    const host = d3.select('figure#scatter');
    host.select('svg').remove();

    this.svg = host
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawPlot(): void {
    const yMax = (d3.max(this.data, d => d.Population) || 0) * 1.1;
    const color = d3.scaleLinear<string>()
    .domain([0, this.data.length - 1])
    .range(['#9ad3cf', '#7ab7e3']);

    // Add X axis
    const x = d3.scaleLinear()
    .domain([2018, 2021])
    .range([ 0, this.width ]);
    const xAxis = this.svg.append('g')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    xAxis.selectAll('text').style('fill', '#4b5563');
    xAxis.selectAll('.tick line').attr('stroke', '#d9e2f3');

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, yMax])
    .range([ this.height, 0]);
    const yAxis = this.svg.append('g')
    .call(d3.axisLeft(y).ticks(6).tickFormat(d3.format('.2s')));

    yAxis.selectAll('text').style('fill', '#4b5563');
    yAxis.selectAll('.tick line').attr('stroke', '#d9e2f3');

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll('dot')
    .data(this.data)
    .enter()
    .append('circle')
    .attr('cx', d => x(d.Census))
    .attr('cy', d => y(d.Population))
    .attr('r', 8)
    .style('opacity', .8)
    .style('fill', (_, i) => color(i))
    .style('stroke', '#f8fbff')
    .style('stroke-width', 1.5);

    // Add labels
    dots.selectAll('text')
    .data(this.data)
    .enter()
    .append('text')
    .text(d => d.City)
    .attr('x', d => x(d.Census))
    .attr('y', d => y(d.Population) - 12)
    .attr('text-anchor', 'middle')
    .style('fill', '#4b5563')
    .style('font-weight', '600')
    .style('font-size', 12);

    this.svg.selectAll('.domain').attr('stroke', '#d9e2f3');
  }

}
