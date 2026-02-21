import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.css'],
    standalone: false
})
export class BarComponent implements OnInit {

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
    this.drawBars(this.data);
  }

  private createSvg(): void {
    const host = d3.select('figure#bar');
    host.select('svg').remove();

    this.svg = host
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.City))
    .padding(0.2);

    const yMax = (d3.max(data, d => d.Population) || 0) * 1.1;

    // Draw the X-axis on the DOM
    const xAxis = this.svg.append('g')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3.axisBottom(x))
    .attr('class', 'bar-axis');

    xAxis.selectAll('text')
    .attr('transform', 'translate(-10,10)rotate(-45)')
    .style('text-anchor', 'end')
    .style('fill', '#4b5563');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, yMax])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    const yAxis = this.svg.append('g')
    .attr('class', 'bar-axis')
    .call(d3.axisLeft(y).ticks(6).tickFormat(d3.format('.2s')));

    yAxis.selectAll('text').style('fill', '#4b5563');
    yAxis.selectAll('.tick line').attr('stroke', '#d9e2f3');

    const color = d3.scaleLinear<string>()
    .domain([0, data.length - 1])
    .range(['#b8d8f5', '#7db9e8']);

    // Create and fill the bars
    this.svg.selectAll('bars')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.City))
    .attr('y', d => y(d.Population))
    .attr('width', x.bandwidth())
    .attr('height', (d) => this.height - y(d.Population))
    .attr('rx', 6)
    .attr('ry', 6)
    .attr('fill', (_, i) => color(i))
    .attr('opacity', 0.9);

    this.svg.selectAll('.domain').attr('stroke', '#d9e2f3');
  }

}
