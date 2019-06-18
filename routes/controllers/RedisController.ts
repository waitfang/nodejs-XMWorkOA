import log4js from 'log4js';
import { ExpressDecrorators } from '../class/ExpressDecrorators';
import { NextFunction } from 'connect';
import { Request,Response } from 'express';
import { EumnRedis }  from '../enum/EumnRedis';//存放Redis名称 
import redis from 'redis';
import child_process from 'child_process'; 
import { any } from 'bluebird';

/**
 * 功能说明：用来处理消息队列
 */
@ExpressDecrorators.controller('xm')
export class RedisController{
    private static client :any =RedisController.Getclient();

    //启动redis server 
    private static Getclient():void{ 
        redis.createClient('redis://127.0.0.1:6379/0'); //服务未启动前创建连接，会抛出异常。

        //先启动redis服务
        // let redis_server = "D:\\devtools\\Redis\\Redis-x64-3.0.504\\redis.cmd";
        // let shell = {shell:redis_server};
        // child_process.execFile(redis_server,[],(err,data)=>{
        //     console.log("child_process.exec"+data.toString());
        //     RedisController.client = redis.createClient('redis://127.0.0.1:6379/0'); 
        // });   
    } 

    // private static client = redis.createClient('redis://127.0.0.1:6379/0'); 
    /**
     * 功能说明：设置Redis
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.ALL()
    static SetRedis(req:Request,res:Response,next:NextFunction){  
        
        let ReturnData = {code:200,msg:'SetRedis '+EumnRedis.hello};

        RedisController.client.set(EumnRedis.hello,JSON.stringify(ReturnData));

        res.render('index', { title: 'Express',ReturnData : JSON.stringify(ReturnData) });
    }

    /**
     * 功能说明：读取Redis
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.GET()
    static GetRedis(req:Request,res:Response,next:NextFunction){ 
        RedisController.client.get(EumnRedis.hello,(err:any,ReturnData:any)=>{
            console.log('Redis hello='+JSON.stringify(ReturnData));
            res.render('index',{title:'Redis',ReturnData:JSON.stringify(ReturnData)}); 
        }); 
    }

}