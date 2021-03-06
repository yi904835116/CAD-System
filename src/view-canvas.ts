import { DrawableShape, Shape } from './shapes';
import { Model, Subject, Observer, } from './model';
import { CanvasController , CanvasSetter} from "./controller"

/**
 * A class to represent the View. Contains control buttons and an HTML5 canvas.
 */
export class View implements Observer {
  //constants for access

  subject: Subject;
  ctrl:CanvasSetter;

  readonly canvas = <HTMLCanvasElement>$('#graphics-view canvas')[0];
  readonly brush = this.canvas.getContext('2d'); //will be correctly typed!

  private selected: DrawableShape; //selected state is handled by View
  private action: string; //what action we are doing (handled by View)

  constructor(subject: Subject) {
    //event listeners (DOM for readability/speed)

    // connect with the model by following Observer
    this.subject = subject;
    this.subject.registerObserver(this);

    this.canvas.addEventListener('mousedown', (e) => { this.handleMouseDown(e) });
    this.canvas.addEventListener('mouseup', (e) => { this.handleMouseUp(e) });
    this.canvas.addEventListener('mousemove', (e) => { this.handleMove(e) });

    let optionButtons = $("#graphics-view input:radio");
    this.action = optionButtons.val(); //current (initial) selection    
    optionButtons.change((e) => { this.action = $(e.target).val(); console.log(this.action); }); //update action

    //responsive canvas
    $(window).resize(() => { this.resizeCanvas() }); //call function on window resize
    this.resizeCanvas(); //initial sizing
  }

  setController(ctrl:CanvasController){
    this.ctrl = ctrl;
  }


  update(shapes: Shape[]) {
    this.display(<DrawableShape[]>shapes);
  }

  display(givenShapes: DrawableShape[]) {
    // display(){
    //erase canvas
    this.brush.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // let shapes = <DrawableShape[]>givenShapes; 
    // let shapes = <DrawableShape[]>this.model.getShapes(); //read from the model   should change to controller


    //draw all the shapes!
    for (let shape of givenShapes) {
      shape.draw(this.brush);
    }
  }

  handleMouseDown(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (this.action === 'move') {
      // this.selected = <DrawableShape>this.model.getShapeAt(x, y); // should change to controller should get a Shape object
       this.selected = <DrawableShape> this.ctrl.getShape(x,y);

    }
    else if (this.action === 'delete') {
      //TODO: delete shape at x,y coordinates
      // this.model.deleteShape(x, y); // should change to controller
      this.ctrl.deleteShape(x,y);
    }
    else { //a creation method
      //TODO: create shape (based on action) at x,y coordinates
      console.log("The action is " + this.action);
      console.log("x is " + x + " y is " + y);

      // this.model.addShape(this.action, x, y);
      this.ctrl.addShape(this.action,x,y);
    }

    // this.display();
  }

  handleMouseUp(event: MouseEvent) {
    this.selected = undefined;
  }

  handleMove(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (this.selected) {
      //TODO: move the selected shape to x,y
      this.ctrl.moveShape(this.selected,x,y);
    }
  }

  //make Canvas responsive (adapted from http://ameijer.nl/2011/08/resizable-html5-canvas/)
  resizeCanvas() {

    const ratio = 1; //4/3;
    let canvasElem = $(this.canvas);
    canvasElem.attr('width', canvasElem.parent().width());
    canvasElem.attr('height', ratio * canvasElem.width());
    this.subject.notifyAll();
    // this.display();
  }
}
