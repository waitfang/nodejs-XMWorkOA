import express from 'express';
import {ExpressDecrorators} from '../class/ExpressDecrorators';
import { NextFunction } from 'connect';
import { EnumLeftTree } from '../enum/EnumLeftTree';
import { MongoDBConn } from '../class/MongoDBConn';
import { enumTables } from '../enum/EnumTables';
import { iUserInfo } from '../interface/iUserInfo';
import { RoleController } from './RoleController';
import { iRole } from '../interface/iRole';
import { iUserToRole } from '../interface/iUserToRole';

/**
 * 功能说明：权限管理
 */
@ExpressDecrorators.controller(EnumLeftTree.auth)
export class AuthController{

    //初始化页面
    @ExpressDecrorators.ALL()
    static Init(req:express.Request,res:express.Response,next:NextFunction){
        res.render('RoleAuth/auth');
    }
    //账号新增页面
    @ExpressDecrorators.ALL()
    static authChildInit(req:express.Request,res:express.Response,next:NextFunction){
        res.render('RoleAuth/authChild');
    } 
    //账号角色分配页面
    @ExpressDecrorators.ALL()
    static authToRoleInit(req:express.Request,res:express.Response,next:NextFunction){
        res.render('RoleAuth/authToRole');
    } 

    @ExpressDecrorators.ALL()
    static AjaxInit(req:express.Request,res:express.Response,next:NextFunction){
        let action =  req.query.action;
        switch(action){ 
            case "ajaxSearchUser":
                AuthController.InitGriddata(req,res,next);
                break;
            case "ajaxAddUser":
                AuthController.InsertUserinfo(req,res,next);
                break;
            case "ajaxDelUser":
                AuthController.DelUserinfo(req,res,next);
                break;
            case "ajaxInitGrid"://获取角色列表
                AuthController.InitRoleGriddata(req,res,next);
                break;
            case "ajaxAddUserToRole"://新增人员角色对照档
                AuthController.InsertUserToRoleinfo(req,res,next);
                break;
            case "ajaxDelUserToRole"://删除人员角色对照档
                AuthController.DelUserToRoleinfo(req,res,next);
                break;
        }
    }

    //自定义函数，初始化grid数据
    private static InitGriddata(req:express.Request,res:express.Response,next:NextFunction){
        let objiUserInfo = <iUserInfo>{}; 
        // objiUserInfo.USERID= req.query.data.USERID==null ? 0 :  parseFloat(req.query.data.USERID);//初始化查所有的，所以不需要条件。    
        let JsonParam =   JSON.stringify(objiUserInfo);
        new MongoDBConn<iUserInfo>().MongoClientFind(enumTables.USERINFO ,JsonParam,(ReturnData:any)=>{
            let vReturnData :any = ReturnData; 
            res.json({"ReturnData":ReturnData});   
        }); 
    }

    //初始化角色数据
    private static InitRoleGriddata(req:express.Request,res:express.Response,next:NextFunction):void{  
        let objRoleToFunction = <iRole>{}; 
        objRoleToFunction.ROLEID= req.query.roleid;//初始化查所有的，所以不需要条件。    
        let JsonParam =   JSON.stringify(objRoleToFunction);
        new MongoDBConn<iRole>().MongoClientFind(enumTables.ROLEINFO ,JsonParam,(ReturnData:any)=>{
            let vReturnData :any = ReturnData; 
            res.json({"Griddata":ReturnData});  
        }); 
    }

    //新增人员档
    private static InsertUserinfo(req:express.Request,res:express.Response,next:NextFunction){
        let objiUserInfo = <iUserInfo>{}; 
        objiUserInfo.USERID= req.query.data.USERID==null ? "0" :  req.query.data.USERID;    
        objiUserInfo.USERNAME= req.query.data.USERNAME;  
        objiUserInfo.USERPASSWORD = req.query.data.USERPASSWORD;  
        objiUserInfo.EMAIL = req.query.data.EMAIL;  
        objiUserInfo.TELEPHONE = req.query.data.TELEPHONE;  
        objiUserInfo.STATE = req.query.data.STATE;  
        objiUserInfo.REMARKS = req.query.data.REMARKS;  

        let JsonParam =  JSON.parse(JSON.stringify(objiUserInfo));
        new MongoDBConn<iUserInfo>().MOngoClientInsertOne(enumTables.USERINFO,JsonParam,(ReturnData:any)=>{
            res.json({"ReturnData":"新增完成！"}); 
        }); 
    }

     //删除人员档
     private static DelUserinfo(req:express.Request,res:express.Response,next:NextFunction){
        let objiUserInfo = <iUserInfo>{}; 
        objiUserInfo.USERID= req.query.data.USERID;    
        let JsonParam =  JSON.parse(JSON.stringify(objiUserInfo));
        new MongoDBConn<iUserInfo>().MOngoClientdelete(enumTables.USERINFO,JsonParam,(ReturnData:any)=>{
            res.json({"ReturnData":"删除完成！"}); 
        });
    }

    //新增人员角色对照档
    private static InsertUserToRoleinfo(req:express.Request,res:express.Response,next:NextFunction){
        let objiUserToRole = <iUserToRole>{}; 
        objiUserToRole.ROLEID= req.query.data.ROLEID==null ? "0" :  req.query.data.ROLEID;    
        objiUserToRole.USERID= req.query.data.USERID;   
        let JsonParam =  JSON.parse(JSON.stringify(objiUserToRole));
        new MongoDBConn<iUserToRole>().MOngoClientInsertOne(enumTables.USERTOROLE,JsonParam,(ReturnData:any)=>{
            res.json({"ReturnData":"新增完成！"}); 
        }); 
    }
    private static DelUserToRoleinfo(req:express.Request,res:express.Response,next:NextFunction){
        let objiUserToRole = <iUserToRole>{}; 
        objiUserToRole.ROLEID= req.query.data.ROLEID==null ? "0" :  req.query.data.ROLEID;    
        objiUserToRole.USERID= req.query.data.USERID;   
        let JsonParam =  JSON.parse(JSON.stringify(objiUserToRole));
        new MongoDBConn<iUserToRole>().MOngoClientdelete(enumTables.USERTOROLE,JsonParam,(ReturnData:any)=>{
            res.json({"ReturnData":"删除完成！"}); 
        }); 
    }


}