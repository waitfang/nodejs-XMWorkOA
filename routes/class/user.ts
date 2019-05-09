/**
 * 功能说明：人员class，继承base，让返回的code，message统一+
 * 作者：Wait
 * 创建时间：2019/04/27
 */ 
import { stringify } from "querystring"; 
import {baseClass} from './base'
import {beforeChkuserinfo}  from "../function/FunAopUser";  //引入aop ts  

export class userClass extends baseClass{ 
    userid:number; 
    username:string;
 

    constructor(userid:number,username:string){
        super(200,true,"constructor");//调用父类的构造函数，需要初始化
        this.userid=userid;
        this.username=username; 
    }
 
    @beforeChkuserinfo()  
    static getUserInfo (params:userClass):userClass{
        //参数做一个装配，处理业务逻辑，然后再返回
        let objuserClass:userClass= new userClass(params.userid,params.username); 
        console.log("Class getUserInfo userid=" + objuserClass.userid +" name:"+objuserClass.username);
        return objuserClass;
    } 
    
    //返回json数据
    static getUserInfoJson (params:userClass):any{
        //参数做一个装配，处理业务逻辑，然后再返回
        let objuserClass= new userClass(params.userid,params.username); 
         
        return JSON.stringify(objuserClass);
    } 


    //getUserInfo 做一个装饰器 ,也就是aop 
    @beforeChkuserinfo()  
    getUserInfo2 = (params:userClass):userClass=>{
        //参数做一个装配，处理业务逻辑，然后再返回
        let objuserClass= new userClass(params.userid,params.username); 
        console.log("Class getUserInfo userid=" + objuserClass.userid +" name:"+objuserClass.username);
        return objuserClass;
    } 

    //根据id获取name  return 在app.ts 收不到返回值
    getusername(userid:number) :string{
        this.username=userid.toString();
        return this.username;
    }  
} ;




 