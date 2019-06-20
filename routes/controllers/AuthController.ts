import express from 'express';
import {ExpressDecrorators} from '../class/ExpressDecrorators';
import { NextFunction } from 'connect';
import { EnumLeftTree } from '../enum/EnumLeftTree';

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


}