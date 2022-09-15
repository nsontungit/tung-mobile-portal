import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laptop-dataset-overview',
  templateUrl: './laptop-dataset-overview.component.html',
  styleUrls: ['./laptop-dataset-overview.component.css']
})
export class LaptopDatasetOverviewComponent implements OnInit {

  panelOpenState = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
