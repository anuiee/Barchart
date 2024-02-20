import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BarchartDynamicComponent } from './barchart-dynamic/barchart-dynamic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,BarChartComponent,BarchartDynamicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'd3-charts';
  //chartData is the data to be passed to child component
  chartData = [
    { range: '0-30', issues: 70 },
    { range: '31-60', issues: 135 },
    { range: '61-90', issues: 60 },
    { range: '>91', issues: 25 }
  ];
  constructor(){
    console.log(this.chartData);

  }
  
}
