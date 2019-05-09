import { ExpressDecrorators } from "../class/ExpressDecrorators";
import express from 'express';
import {enumMessage} from '../enum/EnumMessage';
import { NextFunction } from "connect";
import {userClass} from "../class/user"; 
import { json } from "body-parser";

@ExpressDecrorators.controller("xm")
export class UserController{

    /**
     * api = http://localhost:8088/xm/getUserInfo     * 
     * url = listen(listenPort,listenIP) + controller Path +  function Name 
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.GET()
    static getUserInfo(req:express.Request,res:express.Response,next :express.NextFunction){
        res.json({
            code:enumMessage.Returncode,
            message:enumMessage.Returnmessage,
            reqkey: req.query.userid,
            reqvalue: req.query.username,
        });
    }

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
        let jsonData =  userClass.getUserInfoJson(user);  

        if(user.userid ==enumMessage.outcode )
        {
            res.json(JSON.parse(jsonData));
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
}