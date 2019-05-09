/***
 * 功能说明：用一个切口，check user值* 
 */
 
import {userClass} from '../class/user'; 
import { stringify } from 'querystring';
import {enumMessage} from  "../enum/EnumMessage";
  
/**
 * aop checked 用户名称
 */
export function beforeChkuserinfo():any{
    return (target:userClass,methodName:string ,descriptor:PropertyDescriptor):any=>{
        if (descriptor==null) return;
        let callback = descriptor.value;
        descriptor.value = (param : userClass)=>{ 　

            console.log(enumMessage.outstring);
            //做个简单验证，是否为wait
            if(param.username.toLowerCase().indexOf("wait") != -1){
                param.userid = enumMessage.outcode; 
                param.username=enumMessage.outstring;  
            }
                

            callback(param);
        } 
    }
}  

export function funGetuser(param:any):any { 
    console.log( enumMessage.strValue + param.username);
    param.username = enumMessage.strValue;
    return param; 
}