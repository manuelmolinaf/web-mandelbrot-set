import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

const WIDTH = 1000;
const HEIGHT = 1000;

@Component({
  selector: 'mandelbrot-canvas',
  templateUrl: './mandelbrot-canvas.component.html',
  styleUrls: ['./mandelbrot-canvas.component.css']
})
export class MandelbrotCanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  public maxN:number = 200;

  public minR:number = -1.5;
  public maxR:number = 1.5;

  public minI:number = -1.5;
  public maxI:number = 1.5;

  public cx = 0;
  public cy = 0.8;

  public isJuliaSet = 1;

  public img:any;


  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.draw();
    this.canvasToImage();
  }

  draw() {

    for (let y = 0; y < WIDTH; y++ ) {

      for (let x = 0; x < HEIGHT; x++ ) {

        let cr = this.mapToReal(x, WIDTH, this.minR, this.maxR);
        let ci = this.mapToImaginary(y, HEIGHT, this.minI, this.maxI);
        let n = 0.0;
        if(!this.isJuliaSet) {
          n = this.findMandelbrot(cr, ci, this.maxN);
        }
        else {
          n = this.findJuliaSet(cr, ci, this.maxN);
        }
        

        //coloring functions
        let r = (n % 255);
        let g = (n % 255);
        let b = (n % 255);

        this.ctx.beginPath();
        this.ctx.rect(x, y, 1, 1);
        this.ctx.strokeStyle = 'rgb(' + r + ',' + g +',' + b + ')';
        this.ctx.stroke();

      }
    }
    
  }

 

  mapToReal(x:number, imageWidth:number, minR:number, maxR:number):number {

    let range = maxR - minR;

    return x * (range/imageWidth) + minR;

  }

  mapToImaginary(y:number, imageHeight:number, minI:number, maxI:number):number {

    let range = maxI - minI;

    return y * (range/imageHeight) + minI;


  }

  findMandelbrot(cr:number, ci:number, maxIteration:number):number {

    let i = 0;
   
    let x = cr;
    let y = ci;

    while( i < maxIteration) {
      
      let xx = x*x;
      let yy = y*y;
      let twoxy = 2.0 * x * y;
      x = xx - yy + cr;
      y = twoxy + ci;

      if(xx*xx + yy*yy > 16.0) {
        break;
      }
      i++;
    }

    return i;
  }

  findJuliaSet(cr:number, ci:number, maxIteration:number):number {

    let i = 0;
   
    let x = cr;
    let y = ci;

    while( i < maxIteration) {
      
      let xx = x*x;
      let yy = y*y;

      if(xx*xx + yy*yy > 4.0) {
        break;
      }

      let twoxy = 2.0 * x * y;
      x = xx - yy + this.cx;
      y = twoxy + this.cy;

      
      i++;
    }
   return i;
  }


  canvasToImage() {
    let canvas = this.canvas.nativeElement;

    this.img = canvas.toDataURL("image/png");

  }
}
