import { baseClass } from "./base";
import {enumMessage} from '../enum/enumMessage'

export class handler extends baseClass{

    addclickHandler= (e:Event):any =>{
        this.message=enumMessage.handlermessage;
    }
}