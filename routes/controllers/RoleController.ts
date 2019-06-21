import express from 'express';
import { NextFunction } from 'connect';
import {ExpressDecrorators} from '../class/ExpressDecrorators';
import { EnumLeftTree } from '../enum/EnumLeftTree';
import { RedisController } from './RedisController';
import { EumnRedis } from '../enum/EumnRedis';
import { MongoDBConn } from '../class/MongoDBConn';
import { enumTables } from '../enum/EnumTables';
import { iRoleToFunction } from '../interface/iRoleToFunction';
import { iRole } from '../interface/iRole';

/**
 * 功能说明：角色管理
 */
@ExpressDecrorators.controller(EnumLeftTree.Role)
export class RoleController{

    //初始化页面
    @ExpressDecrorators.ALL()
    static Init(req:express.Request,res:express.Response,next:NextFunction){
        res.render('RoleAuth/role');
    } 

    //初始化Tree
    @ExpressDecrorators.GET()
    static AjaxInit(req:express.Request,res:express.Response,next:NextFunction){  
       let action =  req.query.action;
       switch(action){ 
           case "ajaxInitTree" ://初始化Tree
                RoleController.InitTreedata(req,res,next);
                break;
            case "ajaxPageInitGrid" ://初始化Grid表头
                res.json({"Griddata":'init'}); 
                break;
            case "ajaxInitGrid" ://初始化Grid
                RoleController.InitGriddata(req,res,next);
                break;
       }
      
    }



    //=============自定义function============
    //获取功能tree
    private static InitTreedata(req:express.Request,res:express.Response,next:NextFunction):void{
        //从redis中读tree
        let Treedata  = RedisController.client.get(EumnRedis.leftTree,(err:any,Treedata:any)=>{  
            res.json({"Treedata":JSON.parse(Treedata).zh_CN}); 
        }); 
    }


    private static InitGriddata(req:express.Request,res:express.Response,next:NextFunction):void{  
        let objRoleToFunction = <iRole>{}; 
        objRoleToFunction.ROLEID= req.query.roleid;//初始化查所有的，所以不需要条件。    
        let JsonParam =   JSON.stringify(objRoleToFunction);
        new MongoDBConn<iRole>().MongoClientFind(enumTables.ROLEINFO ,JsonParam,(ReturnData:any)=>{
            let vReturnData :any = ReturnData; 
            res.json({"Griddata":ReturnData});  
            //处理数据
            // var bufferData ;
            // for(var item in ReturnData){ 
            //     bufferData = JSON.stringify(ReturnData[item]);  
            // };  
        }); 
    }




    //================END====================
}