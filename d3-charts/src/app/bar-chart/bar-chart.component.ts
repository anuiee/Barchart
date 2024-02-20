import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
 
  constructor(private elementRef: ElementRef) {
    this.drawChart();
   }

  drawChart() {
    const data = [
      { range: '0-30', issues: 140 },
      { range: '31-60', issues: 45 },
      { range: '61-90', issues: 100 },
      { range: '>91', issues: 45 }
    ];

    const svg = d3.select(this.elementRef.nativeElement)
      .select('.chart')
      .append('svg')
      .attr('overflow','visible')
      .attr('width', 700)
      .attr('height', 400)
      .attr('class', 'chart-svg');
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.range))
      .range([margin.left, width + margin.left])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, 150])
      .range([height, 0]);

      const yAxisValues = [0, 25, 50, 75,100, 125, 150];
      // const xAxisValues = ['0-30', '31-60', '61-90','>91'];
      const xAxisValues = data.map(d => d.range);
      //X axis------------------------------------
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).
      tickValues(xAxisValues)
      .tickFormat(d => d)
      .tickSize(0) // Hide the ticks
      )
      .selectAll('text')
      .attr('transform', 'translate(-45)')//position of measure
      .attr('dy', '1.7em');
      //Y axis---------------------------
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale)
      .tickValues(yAxisValues)
      .tickSize(0) // Hide the ticks
      ) 
      .select('.domain')
      .remove(); // Remove the axis line;

  // Add horizontal grid lines--------------------
    svg.selectAll('.grid-line')
    .data(yAxisValues)
    .enter()
    .append('line')
    .attr('class', 'grid-line')
    .attr('x1', margin.left) // Start x position
    .attr('x2', width + margin.left) // End x position
    .attr('y1', d => yScale(d)) // Start y position
    .attr('y2', d => yScale(d)) // End y position
    .attr('stroke', '#ccc') // Line color
    // .attr('stroke-dasharray', '4') // Optional: dashed line style
    .attr('stroke-width', '1'); // Line width


    
      
    // Draw overlay bars to fill the remaining part with another color
    svg.selectAll('.overlay-bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'overlay-bar')
    .attr('x', d => xScale(d.range) || 0)
    .attr('y', 0) // Set y to 0 to ensure overlay bars start from the top
    .attr('width',40)
    .attr('height', height) // Set height to match the height of the chart area
    .attr('fill', '#e5f1f1')
    .attr('rx', 5) // Round corner radius for top-left and top-right
    .attr('ry', 5); // Round corner radius for top-left and top-right;
    //rect---main bar----------------------
    
    // svg.selectAll('.main-bar')
    // .data(data)
    // .enter()
    // .append('rect')
    // .attr('class', 'main-bar')
    // .attr('x', d => xScale(d.range) || 0)
    // .attr('y', d => yScale(d.issues))
    // .attr('width',40)  //40 instead xScale.bandwidth()
    // .attr('height', d => height - yScale(d.issues))
    // .attr('fill', '#429b03' )// fill color based on the data value
    // .attr('rx', 5) // Round corner radius for top-left and top-right
    // .attr('ry', 5) // Round only the top corners for all bars  
  // path---main bar----------------------
svg.selectAll('.main-bar')
.data(data)
.enter()
.append('path')
.attr('class', 'main-bar')
.attr('d', d => {
  const x: number = xScale(d.range) || 0;
  const y: number = yScale(d.issues);
  const width: number = 40; // 40 instead xScale.bandwidth()
  const height: number = 400 - margin.top - margin.bottom - y; // Explicitly define height based on the chart's overall height and the bar's y position
  const borderRadius: number = 5; // Radius for rounded corners

  // Calculate the y-coordinate for the starting point (M command) to ensure the bar starts from the x-axis
  const startY: number =yScale(0);

  // Constructing the path commands for the bar with rounded corners
  return `
    M ${x},${startY}
    v ${-height + borderRadius}
    a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},${-borderRadius}
    h ${width - 2 * borderRadius}
    a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},${borderRadius}
    v ${height - borderRadius}
    h ${-width}
    Z
  `;
})
.attr('fill', '#429b03'); // fill color based on the data value


    // X axis label
svg.append('text')
.attr('class', 'x-label')
.attr('x', width / 2) // Position at the middle of the SVG horizontally
.attr('y', height + margin.top + 20) // Position below the x axis
.attr('text-anchor', 'middle')
.text('Number of Days');

// Y axis label
svg.append('text')
.attr('class', 'y-label')
.attr('transform', 'rotate(-90)') // Rotate the text to make it vertical
.attr('x', -height / 2) // Position at the middle of the SVG vertically (since it's rotated)
.attr('y', -margin.left) // Position to the left of the y axis
.attr('dy', '1em') // Adjust vertical alignment
.attr('text-anchor', 'middle')
.text('Issues');

  }
 
}
