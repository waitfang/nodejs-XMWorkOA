//功能说明：启动文件，
//作者：Wait
//创建时间：2019/04/27

import express, { Request, Response, NextFunction } from 'express';   
import {fsreadJsonFile,fsreadFileSync}  from  './routes/function/fun_resource';//引入配置档读取功能
import {ExpressDecrorators} from './routes/class/ExpressDecrorators';
import {UserController} from './routes/controllers/UserController';

// fsreadJsonFile();//异步读取json配置
let mResourceJson  = fsreadFileSync();//同步读取
//监听ip和端口
let listenIP = mResourceJson.listenIP; // "localhost";
let listenPort=mResourceJson.listenPort;//8088; 

let app = express();  
ExpressDecrorators.app = app;

UserController; //引用路由页

app.listen(listenPort,listenIP); 