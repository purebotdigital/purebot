import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  title = 'AI Ethics';
  type = 'ColumnChart';
  fairness;
  dataProtection;
  accountability;
  transparency;
  proActive;
  data;
  piechartType = 'PieChart';
  columnNames = ['Browser', 'Percentage'];
  options = {
    colors: ['#b6e00e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true
  };
  width = 550;
  height = 400;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const parsedData = JSON.parse(params.similarityIndex);
      this.fairness = parsedData[0] * 100;
      this.dataProtection = parsedData[1] * 100;
      this.accountability = parsedData[2] * 100;
      this.transparency = parsedData[3] * 100;
      this.proActive = parsedData[4] * 100;
      this.data = [
        ['Proactiveness', this.proActive],
        ['Fairness', this.fairness],
        ['Data Protection', this.dataProtection],
        ['Acountability', this.accountability],
        ['Transparency', this.transparency],
      ];
    });
  }

}
