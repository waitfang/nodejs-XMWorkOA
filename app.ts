//功能说明：启动文件，
//作者：Wait
//创建时间：2019/04/27

import express, { Request, Response, NextFunction } from 'express';   
import {fsreadJsonFile,fsreadFileSync}  from  './routes/function/fun_resource';//引入配置档读取功能
import {ExpressDecrorators} from './routes/class/ExpressDecrorators';
import {UserController} from './routes/controllers/UserController';
import bodyParser from 'body-parser';
import log4js from 'log4js' //log4js 日志管理 
import logger from 'morgan'; //nodejs 日志管理
import { handler } from './routes/class/handler';

// fsreadJsonFile();//异步读取json配置
let mResourceJson  = fsreadFileSync();//同步读取
//监听ip和端口
let listenIP = mResourceJson.listenIP; // "localhost";
let listenPort=mResourceJson.listenPort;//8088; 
let log4jsConfigure = "public\\resource\\log4js.json";//log4js 配置文件

let app = express();  
// app.use(bodyParser);
// app.use(bodyParser.urlencoded({ extended: true }));
log4js.configure(log4jsConfigure)
app.use(log4js.connectLogger(log4js.getLogger("default"), { level: 'auto' }));
app.use(logger("dev"));     //日志打印到控制台 

// ExpressDecrorators.app = app;

// UserController; //引用路由页

app.get("*/xm/Chkuserinfo",(req:Request,res:Response,next :NextFunction)=>{
    
    res.json({message:"测试用！"})
});

app.listen(listenPort,listenIP); 