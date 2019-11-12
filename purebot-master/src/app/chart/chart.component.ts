import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  title = 'Browser market shares at a specific website, 2014';
  type = 'ColumnChart';
  data = [
    ['Firefox', 64.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 40.7]
  ];
  piechartType = 'PieChart';
  columnNames = ['Browser', 'Percentage'];
  options = {
    colors: ['#b6e00e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true
  };
  width = 550;
  height = 400;
  constructor() { }

  ngOnInit() {
  }

}
