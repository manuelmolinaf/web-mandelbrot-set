import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  x:number = -0.7269;
  y:number = 0.1889;
  isJuliaSet = 0;

  constructor() { }

  ngOnInit() {
  }

}
