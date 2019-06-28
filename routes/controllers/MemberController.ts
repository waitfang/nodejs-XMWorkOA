import { ExpressDecrorators } from "../class/ExpressDecrorators";
import express from 'express';
import { NextFunction } from "connect";
import { EnumLeftTree } from "../enum/EnumLeftTree";
import { BaseController } from "./BaseController";

/**
 * 功能说明：会员管理
 */
@ExpressDecrorators.controller(EnumLeftTree.Member)
export class MemberController extends BaseController{

    //初始化页面
    @ExpressDecrorators.ALL()
    static Init(rep:express.Request,res:express.Response,next:NextFunction){
        res.render("Member/member");
    }

}