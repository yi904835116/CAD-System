import { View } from "./view-canvas";
import {Model, Subject,Observer} from './model';

interface CanvasSetter {
    addShape();
    deleteShape();
}

interface TextSetter {
    editShape();
}

class CanvasView implements CanvasSetter{

    addShape(){
        
    }

    deleteShape(){

    }

}

class TextView implements TextSetter{
    
    editShape(){

    }

}
