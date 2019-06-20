import express from 'express';
import { NextFunction } from 'connect';
import {ExpressDecrorators} from '../class/ExpressDecrorators';
import { EnumLeftTree } from '../enum/EnumLeftTree';
import { RedisController } from './RedisController';
import { EumnRedis } from '../enum/EumnRedis';

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
        let Treedata  = RedisController.client.get(EumnRedis.leftTree,(err:any,Treedata:any)=>{ 
            // return JSON.parse(Treedata).zh_CN; 
            res.json({"Treedata":JSON.parse(Treedata).zh_CN});
        });   
        // res.json({"Treedata":Treedata});
    }
}