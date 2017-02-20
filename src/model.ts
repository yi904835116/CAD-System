import { Shape, Circle, Rectangle, Triangle } from './shapes';
import { View } from "./view-canvas";
/**
 * The CAD drawing model currently being created
 */
export class Model implements Subject {
  private shapes: Shape[] = [];
  private observers: Observer[] = [];

  factory: Factory = new ShapeFactory();
  constructor() { }

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(deleted: Observer): void {
    //remove from array (e.g,. with lodash)
    this.observers = this.observers.filter(ele => ele != deleted);
  }

  // 
  notifyAll(): void {
    this.observers.forEach((observer: Observer) => {
      observer.update(this.shapes);
      // observer.update();
    })

  }

  getShapes(): Shape[] {
    return this.shapes;
  }

  getShapeAt(x: number, y: number): Shape {
    let found: Shape;
    for (let shape of this.shapes) {
      if (shape.contains(x, y)) {
        found = shape;
      }
    }
    return found; //return last shape
  }

  addShape(type: string, xCor: number, yCor: number) {
    if (type != null) {
      let shape: Shape;
      switch (type) {
        case "circle":
          shape = this.factory.createCircle(xCor, yCor);
          break;
        case "rectangle":
          shape = this.factory.createRectangle(xCor, yCor);
          break;
        case "triangle":
          shape = this.factory.createTriangle(xCor, yCor);
          break;
        default:
          console.log("invalid shape type");
      }
      this.shapes.push(shape);
    }
    this.notifyAll();
  }

  deleteShape(x: number, y: number) {
    this.shapes = this.shapes.filter(ele => ele != this.getShapeAt(x, y));
  }

  editShape(x: number, y: number, json: JSON) {
    let edited = this.getShapeAt(x, y);

  }



}


export interface Subject {
  registerObserver(observer: Observer): void;
  // removeObserver(observer:Observer):void;
  notifyAll(): void;
}

//Behaviors for Observers (subscribers)
export interface Observer {
  update(shapes:Shape[]): void;
  // update(): void;
}



//an interface for a complex factory
abstract class Factory {
  abstract createCircle(cx: number, cy: number): Circle;
  abstract createTriangle(cx: number, xy: number): Triangle;
  abstract createRectangle(cx: number, cy: number): Rectangle;
}

//a concrete class that implements the Factory
class ShapeFactory extends Factory {
  private DEFAULT_RADIUS = 40;
  private DEFAULT_WIDTH = 60;
  private DEFAULT_HEIGHT = 60;
  // private TRIAN_HEIGHT = 40;
  // private TRIAN_EDGE = 40;

  constructor() {
    super();
  }
  createRectangle(cx: number, cy: number): Rectangle {
    return new Rectangle(cx, cy, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
  }

  createCircle(cx: number, cy: number): Circle {
    return new Circle(cx, cy, this.DEFAULT_RADIUS);
  }
  createTriangle(cx: number, cy: number): Triangle {
    return new Triangle(cx, cy ,
      cx - 0.5 * this.DEFAULT_WIDTH, cy - this.DEFAULT_HEIGHT,
      cx + 0.5 * this.DEFAULT_WIDTH, cy - this.DEFAULT_HEIGHT);
  }
}

