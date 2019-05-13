import { ExpressDecrorators } from "../class/ExpressDecrorators";
import express from 'express';
import {enumMessage} from '../enum/EnumMessage';
import { NextFunction } from "connect";
import {userClass} from "../class/user"; 
import { json } from "body-parser";
import {MongoDBConn} from '../class/MongoDBConn';
import {iUserInfo} from '../interface/iUserInfo';
import   {enumTables}    from '../enum/EnumTables'

@ExpressDecrorators.controller("xm")
export class UserController{
 
    private enumTables = enumTables;
    /**
     * 功能说明：验证输入的userinfo是否正确
     * api = http://localhost:8088/xm/Chkuserinfo     * 
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.ALL()
    static Chkuserinfo(req:express.Request,res:express.Response,next : NextFunction){
        let user= new userClass(enumMessage.userInituserid,enumMessage.userInitusername);//需要实例化，所以先给定一个值
        if(req.query.userid !=null && req.query.username !=null){
            user.userid = req.query.userid;
            user.username = req.query.username;
        }
        //call 逻辑处理部分
        userClass.getUserInfo(user);   
        
        //class to json 直接输出
        let JsonData =  userClass.getUserInfoJson(user);  

        if(user.userid ==enumMessage.outcode )
        {
            res.json(JSON.parse(JsonData));
        }
        else
        {
            res.json({
                code:  enumMessage.Returncode,
                message: enumMessage.Returnmessage,
                reqkey: user.userid,
                reqvalue: user.username,
            });
        }
    }


    /**
     *功能说明： checked MongoDB 
     * api = http://localhost:8088/xm/MongoDBConn  
     *  */
    @ExpressDecrorators.ALL()
    static ClientMongoDBConn (req:express.Request,res:express.Response,next:NextFunction){

       let  returnMongoClientConn = new MongoDBConn<iUserInfo>().MongoClientConn(
           (ReturnData:JSON)=>{
                res.json(ReturnData);
            }
       ); 
    } 

    /**
     * api = http://localhost:8088/xm/getUserInfo     * 
     * url = listen(listenPort,listenIP) + controller Path +  function Name 
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.GET()
    static FindUserInfo(req:express.Request,res:express.Response,next :express.NextFunction){
        let iobjUserInfo:iUserInfo = <iUserInfo>{}; 
        iobjUserInfo.key= req.query.username;
        iobjUserInfo.USERNAME=  req.query.username.toUpperCase();

       let JsonParam =   JSON.stringify(iobjUserInfo);
       new MongoDBConn().MongoClientFind(enumTables.USERINFO ,JsonParam,(ReturnData:JSON)=>{
           let vReturnData :JSON = ReturnData;
           res.json(ReturnData);
       });
    }
    
}