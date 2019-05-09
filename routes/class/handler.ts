import { baseClass } from "./base";
import {enumMessage} from '../enum/EnumMessage'

export class handler extends baseClass{

    addclickHandler= (e:Event):any =>{
        this.message=enumMessage.handlermessage;
    }
}