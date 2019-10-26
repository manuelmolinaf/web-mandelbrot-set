import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

const WIDTH = 1000;
const HEIGHT = 1000;

@Component({
  selector: 'mandelbrot-canvas',
  templateUrl: './mandelbrot-canvas.component.html',
  styleUrls: ['./mandelbrot-canvas.component.css']
})
export class MandelbrotCanvasComponent implements OnInit {

  @Input() juliaX:number;
  @Input() juliaY:number;
  @Input() isJuliaSet:number;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  public maxN:number = 500;

  public minR:number = -1.6;
  public maxR:number = 1.6;

  public minI:number = -1.6;
  public maxI:number = 1.6;


  public img:any;


  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.update();
  }

  ngOnChanges() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.update();
  }

  update() {
    this.ctx.clearRect(0,0,WIDTH,HEIGHT);
    this.draw();
    this.canvasToImage();
  }

  draw() {

    this.ctx.translate(0, HEIGHT);
    this.ctx.scale(1,-1);

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
        let h = (n*7 % 359);

        let s = 50;
        if(n === this.maxN) {
          s = 0;
        }

        this.ctx.beginPath();
        this.ctx.rect(x, y, 1, 1);
        this.ctx.strokeStyle = 'hsl(' + h.toString() +', 100%,' + s.toString() +'%)';
        //this.ctx.strokeStyle = 'hsl(' + h.toString() +', 100%,' + h.toString() +'%)';
        //this.ctx.strokeStyle = 'hsl(' + h.toString() +', ' + h.toString() +'%, 50%)';
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

      if(xx*xx + yy*yy > 16.0) {
        break;
      }

      let twoxy = 2.0 * x * y;
      x = xx - yy + this.juliaX;
      y = twoxy + this.juliaY;

      
      i++;
    }
   return i;
  }


  canvasToImage() {
    let canvas = this.canvas.nativeElement;

    this.img = canvas.toDataURL("image/png");

  }
}
