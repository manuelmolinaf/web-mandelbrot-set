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
  @Input() maxN:number;
  @Input() minR:number;
  @Input() maxR:number;
  @Input() minI:number;
  @Input() maxI:number;

  @Input() treeN:number;
  @Input() treeDegree:number;
  @Input() branchLength:number;
  @Input() treeColor:number;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  public img:any;
  
  

  //comenta drawtree en ngoninit y on changes y descomenta update en ambos para dibujar mandelbrot
  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawTree();
    //this.update();
  }

  ngOnChanges() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawTree();
    //this.update();
  }

  update() {
    this.ctx.clearRect(0,0,WIDTH,HEIGHT);
    this.ctx.save();
    this.ctx.translate(0, HEIGHT);
    this.ctx.scale(1,-1);
    this.draw();
    this.ctx.restore();
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
        

        //coloring function
        let h = (n % 360) ;

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

  drawTree() {
    this.ctx.clearRect(0,0,WIDTH,HEIGHT);
    this.drawFractalTree( this.branchLength, WIDTH/2, HEIGHT, 0, true, 270 );
    this.canvasToImage();
  }

  drawFractalTree(lenght:number, x:number, y:number, index:number, isLeft:boolean, angle:number) {

    this.ctx.beginPath();

    let coords: number[];
    

    if(index === 0) {

      coords = this.lineToAngle(x, y, lenght, 270, index);
    }
    else {

      if(isLeft) {
        coords = this.lineToAngle(x, y, lenght, angle + this.treeDegree, index);
      }
      else {
        coords = this.lineToAngle(x, y, lenght, angle - this.treeDegree, index);
      }

    }
    
    
    index++;

    if(index !== this.treeN) {
      this.drawFractalTree(lenght*0.67, coords[0], coords[1], index, true, angle + this.treeDegree);
      this.drawFractalTree(lenght*0.67, coords[0], coords[1], index, false, angle - this.treeDegree);
    }

  }

  lineToAngle(x1:number, y1:number, length:number, angle:number, index:number) {

    angle *= Math.PI / 180;

    var x2 = x1 + length * Math.cos(angle),
        y2 = y1 + length * Math.sin(angle);

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    //cambia aqui abajo los colorer el primer argumento, tree color es el color , el segundo la 
    //saturacion y el tercero que tan claro u oscuro
    this.ctx.strokeStyle = 'hsl(' + this.treeColor.toString() +', 100%, 50%)';
    this.ctx.stroke();

    return [x2, y2];
  }

}
