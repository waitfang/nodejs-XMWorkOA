import express from 'express';
import { NextFunction } from 'connect';
import {ExpressDecrorators} from '../class/ExpressDecrorators';
import { EnumLeftTree } from '../enum/EnumLeftTree';

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
}