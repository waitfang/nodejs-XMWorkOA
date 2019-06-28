import { ExpressDecrorators } from "../class/ExpressDecrorators";
import { NextFunction } from "connect";
import express from 'express';
import { fsreadTree } from "../function/FunConfig";
import { EumnRedis } from "../enum/EumnRedis";
import { RedisController } from "./RedisController";
import { BaseController } from "./BaseController";
import { iUserInfo } from "../interface/iUserInfo";
import { MongoDBConn } from "../class/MongoDBConn";
import { enumTables } from "../enum/EnumTables";

@ExpressDecrorators.controller("xm")
export class LoginController extends BaseController{ 
    
    /**
     * 功能说明：login
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.ALL()
    static login(req:express.Request,res:express.Response,next:NextFunction){ 
        fsreadTree();//读tree到redis
        res.render('login', { title: 'Express'});
    }

    //Ajax功能集合
    @ExpressDecrorators.ALL()
    static AjaxInit(req:express.Request,res:express.Response,next:NextFunction){  
       let action =  req.query.action;
       switch(action){ 
           case "ajaxInitUser" ://初始化Tree
                new LoginController().InitUserdata(req,res,next);
                break;  
       }
      
    }

    //登陆成功后，写入
    private InitUserdata(req:express.Request,res:express.Response,next:NextFunction):void{  
        let objUserInfo = <iUserInfo>{};  
        objUserInfo.USERID=  req.query.USERID.toUpperCase();
        objUserInfo.USERPASSWORD = req.query.USERPASSWORD;

       let JsonParam =  JSON.stringify(objUserInfo);
       new MongoDBConn<iUserInfo>().MongoClientFind(enumTables.USERINFO ,JsonParam,(ReturnData:any)=>{ 
            BaseController.setUserinfo(JSON.stringify(ReturnData));//记录登陆信息。
            res.json({"ReturnData" : ReturnData});
       });
    }



    
    /**
     * 功能说明：主页
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.ALL()
    static _main(req:express.Request,res:express.Response,next:NextFunction){ 
        res.render('_main', { title: 'Express'});
    }

     /**
     * 功能说明：left
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.ALL()
    static _left(req:express.Request,res:express.Response,next:NextFunction){ 
        //读取redis中的tree，然后输出到页面。
        RedisController.client.get(EumnRedis.leftTree,(err:any,Treedata:any)=>{
            // console.log('Redis leftTree='+JSON.stringify(Treedata));
            res.render('_left',{title:'Redis',Treedata:JSON.parse(Treedata).zh_CN}); 
        });  
    }

     /**
     * 功能说明：top
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.ALL()
    static _top(req:express.Request,res:express.Response,next:NextFunction){ 
        res.render('_top', { title: 'Express'});
    }

}