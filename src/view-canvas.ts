import {DrawableShape} from './shapes';
import {Model, Subject,Observer} from './model';

/**
 * A class to represent the View. Contains control buttons and an HTML5 canvas.
 */
export class View implements Observer{
  //constants for access

  subject:Subject;


  readonly canvas = <HTMLCanvasElement>$('#graphics-view canvas')[0];
  readonly brush = this.canvas.getContext('2d'); //will be correctly typed!
  
  readonly updateButton = $("update");

  private selected:DrawableShape; //selected state is handled by View
  private action:string; //what action we are doing (handled by View)


  constructor(private model:Model){
    //event listeners (DOM for readability/speed)

    // connect with the model by following Observer
    this.subject = model;
    this.subject.registerObserver(this);

    this.canvas.addEventListener('mousedown', (e) => {this.handleMouseDown(e)});
    this.canvas.addEventListener('mouseup', (e) => {this.handleMouseUp(e)});
    this.canvas.addEventListener('mousemove', (e) => {this.handleMove(e)});

    let optionButtons = $("#graphics-view input:radio");
    this.action = optionButtons.val(); //current (initial) selection    
    optionButtons.change((e) => { this.action = $(e.target).val();  console.log(this.action); }); //update action

    //responsive canvas
    $(window).resize(() => {this.resizeCanvas()}); //call function on window resize
    this.resizeCanvas(); //initial sizing

  }

  // ?????
  update(){
    //update the display
    this.display();
  }

  display() {
    //erase canvas
    this.brush.clearRect(0,0, this.canvas.width, this.canvas.height);

    let shapes = <DrawableShape[]>this.model.getShapes(); //read from the model   should change to controller

    //draw all the shapes!
    for(let shape of shapes){
      shape.draw(this.brush);
    }
  }

  handleMouseDown(event:MouseEvent){
    let x = event.offsetX;
    let y = event.offsetY;

    if(this.action === 'move') { 
      this.selected = <DrawableShape>this.model.getShapeAt(x,y); // should change to controller
    }
    else if(this.action === 'delete') {
      //TODO: delete shape at x,y coordinates


      this.model.deleteShape(x,y);
      this.display();
    }
    else { //a creation method
      //TODO: create shape (based on action) at x,y coordinates
      console.log("The action is " + this.action);
      
      this.model.addShape(this.action, x,y);
      this.display();
    }
  }  

  handleMouseUp(event:MouseEvent){
    this.selected = undefined;    
  }

  handleMove(event:MouseEvent){
    let x = event.offsetX;
    let y = event.offsetY;

    if(this.selected){
      //TODO: move the selected shape to x,y
    }
  }

  //make Canvas responsive (adapted from http://ameijer.nl/2011/08/resizable-html5-canvas/)
  resizeCanvas() {
    const ratio = 1; //4/3;
    let canvasElem = $(this.canvas);
    canvasElem.attr('width', canvasElem.parent().width());
    canvasElem.attr('height', ratio*canvasElem.width());
    this.display();
  }
}
