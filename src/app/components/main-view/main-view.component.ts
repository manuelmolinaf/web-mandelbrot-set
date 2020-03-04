import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public x:number = -0.7269;
  public y:number = 0.1889;
  public isJuliaSet = 0;

  public maxN:number = 200;
  public minR:number = -1.6;
  public maxR:number = 0.6;
  public minI:number = -1.1;
  public maxI:number = 1.1;

  public treeN = 1;
  public treeDegree:number = 0;
  public branchLength:number = 250;
  public treeColor:number = 0;
  public treeColorStyle = 'color:hsl('+ this.treeColor.toString() +', 300, 50)';
  public fractalType:number = 1;

  constructor() { }

  ngOnInit() {
  }

}
