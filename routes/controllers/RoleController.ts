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
import { any } from 'bluebird';

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

    //Ajax功能集合
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
            case "ajaxInitGrid" ://初始化Grid数据
                RoleController.InitGriddata(req,res,next);
                break;
            case "ajaxinsertRoletoFun" ://insert 角色功能
                RoleController.InsertRoletoFun(req,res,next);
                break;
            case "ajaxRoletoFun": //根据点选的角色，获取对应的角色功能。
                RoleController.GetTreeRoletoFun(req,res,next);
                break;
            case "ajaxInsertRole" ://insert 角色
                RoleController.InsertRole(req,res,next);
                break;
            case "ajaxDelRole" ://Del 角色
                RoleController.DelRole(req,res,next);
                break;
            case "ajaxEditRole" ://Edit 角色
                RoleController.EditRole(req,res,next);
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

    //初始化角色数据
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

    //新增角色档
    private static InsertRole(req:express.Request,res:express.Response,next:NextFunction){
        let objRole = <iRole>{}; 
        objRole.ROLEID= req.query.data.ROLEID==null ? 0 :  parseFloat(req.query.data.ROLEID);    
        objRole.ROLENAME= req.query.data.ROLENAME;  
        objRole.ROLESTATE = req.query.data.ROLESTATE ==null ? 0 : parseFloat(req.query.data.ROLESTATE);  
        let JsonParam =  JSON.parse(JSON.stringify(objRole));
        new MongoDBConn<iRole>().MOngoClientInsertOne(enumTables.ROLEINFO,JsonParam,(ReturnData:any)=>{});
        res.json({"ReturnData":"新增完成！"}); 
    }
     //删除角色档
     private static DelRole(req:express.Request,res:express.Response,next:NextFunction){
        let objRole = <iRole>{}; 
        objRole.ROLEID= req.query.data.ROLEID==null ? 0 :  parseFloat(req.query.data.ROLEID);    
        let JsonParam =  JSON.parse(JSON.stringify(objRole));
        new MongoDBConn<iRole>().MOngoClientdelete(enumTables.ROLEINFO,JsonParam,(ReturnData:any)=>{});
        //删除角色，应该吧角色对照档也删了，不想写了。。。iRoleToFunction
        res.json({"ReturnData":"删除完成！"}); 
    }
    //修改角色档
    private static EditRole(req:express.Request,res:express.Response,next:NextFunction){
        let objRole = <iRole>{}; 
        objRole.ROLEID= req.query.data.ROLEID==null ? 0 :  parseFloat(req.query.data.ROLEID);
        let WhereJsonParam =  JSON.parse(JSON.stringify(objRole)); 
         
        objRole = <iRole>{};   
        objRole.ROLENAME= req.query.data.ROLENAME;  
        objRole.ROLESTATE = req.query.data.ROLESTATE ==null ? 0 : parseFloat(req.query.data.ROLESTATE);  
        let JsonParam =  JSON.parse(JSON.stringify(objRole));
        new MongoDBConn<iRole>().MOngoClientupdateMany(enumTables.ROLEINFO,WhereJsonParam,JsonParam,(ReturnData:any)=>{});
        res.json({"ReturnData":"修改完成！"}); 
    }


    //根据角色获取对应的功能
    private static GetTreeRoletoFun(req:express.Request,res:express.Response,next:NextFunction):void{  
        let objRoleToFunction = <iRoleToFunction>{}; 
        objRoleToFunction.ROLEID= req.query.data.ROLEID;//初始化查所有的，所以不需要条件。    
        let JsonParam = JSON.stringify(objRoleToFunction);
        new MongoDBConn<iRoleToFunction>().MongoClientFind(enumTables.ROLETOFUNCTION ,JsonParam,(ReturnData:any)=>{
            let vReturnData :any = ReturnData; 
            res.json({"ReturnData":ReturnData});   
        }); 
    }

    //新增角色功能对照档
    private static InsertRoletoFun(req:express.Request,res:express.Response,next:NextFunction){
        let objRoleToFunction = <iRoleToFunction>{}; 
        objRoleToFunction.ROLEID= req.query.data.ROLEID; 
        let JsonParam =  JSON.parse(JSON.stringify(objRoleToFunction)); 
        new MongoDBConn<iRoleToFunction>().MOngoClientdelete(enumTables.ROLETOFUNCTION,JsonParam,(ReturnData:any)=>{ 
            //删除角色对应的所有功能，再新增。
            objRoleToFunction.GAMEID= req.query.data.GAMEID; 
            let data = req.query.data.data;
            data.forEach((element:any) => {
                objRoleToFunction.FUNCTIONID =  element.FUNCTIONID;
                objRoleToFunction.FUNACTIONID =  element.FUNACTIONID;
    
                JsonParam =  JSON.parse(JSON.stringify(objRoleToFunction));
                new MongoDBConn<iRoleToFunction>().MOngoClientInsertOne(enumTables.ROLETOFUNCTION,JsonParam,(ReturnData:any)=>{});
            }); 
        }); 
        res.json({"ReturnData":"新增完成！"}); 
    }




    //================END====================
}