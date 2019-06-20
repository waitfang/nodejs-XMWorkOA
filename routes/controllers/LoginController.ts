import { ExpressDecrorators } from "../class/ExpressDecrorators";
import { NextFunction } from "connect";
import express from 'express';

@ExpressDecrorators.controller("xm")
export class LoginController{

    /**
     * 功能说明：login
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.ALL()
    static login(req:express.Request,res:express.Response,next:NextFunction){ 
        res.render('login', { title: 'Express'});
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
        res.render('_left', { title: 'Express'});
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