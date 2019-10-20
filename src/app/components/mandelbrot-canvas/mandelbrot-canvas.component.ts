import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

const WIDTH = 2500;
const HEIGHT = 2500;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mandelbrot-canvas',
  templateUrl: './mandelbrot-canvas.component.html',
  styleUrls: ['./mandelbrot-canvas.component.css']
})
export class MandelbrotCanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  public maxN:number = 500;

  public minR:number = -1.5;
  public maxR:number = 0.7;

  public minI:number = -1.0;
  public maxI:number = 1.0;


  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.draw();
  }

  draw() {

    for (let y = 0; y < WIDTH; y++ ) {

      for (let x = 0; x < HEIGHT; x++ ) {

        let cr = this.mapToReal(x, WIDTH, this.minR, this.maxR);
        let ci = this.mapToImaginary(y, HEIGHT, this.minI, this.maxI);
        let n = this.findMandelbrot(cr, ci, this.maxN);

        //coloring functions
        let r = (n * Math.sin(30) % 256);
        let g = (n * Math.acosh(n) % 256);
        let b = ( n * 30 % 256);

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
    let zr = 0.0;
    let zi = 0.0;

    while( i < maxIteration && zr * zr + zi * zi < 4.0) {

      let temp = zr * zr - zi * zi + cr;
      zi = 2.0 * zr * zi + ci;
      zr = temp;
      i++;
    }


    return i;
  }

}
