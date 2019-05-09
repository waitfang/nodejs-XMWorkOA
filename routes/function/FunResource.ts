//功能说明：读取resource信息。
//作者：Wait
//创建时间：2019/04/27

import express, { Request, Response, NextFunction } from 'express';
import {enumMessage} from '../enum/EnumMessage';
import fs from 'fs';
import { json } from 'body-parser';
let resource = "public\\resource\\resource.json";//文本信息放入json档
var mResourceJson;
let app = express();

// exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口
exports.fsreadFile =
{
    fsreadFile : function (){
        //完成aop后，接下来学习的内容
        // JSON Schema
        // Promise.all([p1, p2, p3]).then( ()=>{} ) 
        fs.readFile(resource,function(err,data){
            if (err){
                    console.log(err.stack);
                    return {
                        "code":404,
                        "message":"Unable to access resource files!"
                    };
                }
                
                mResourceJson  = JSON.parse(data.toString());
                console.log(mResourceJson.listenPort + "--" + mResourceJson.listenIP );
                //读设定档里面的IP+Port
                app.listen(mResourceJson.listenPort,mResourceJson.listenIP);
        });
    },
    
    fswriteFile : function(){ 
        console.log(enumMessage.WriteString);
    }
}

//异步读取
export function fsreadJsonFile() :any {
        //完成aop后，接下来学习的内容
        // JSON Schema
        // Promise.all([p1, p2, p3]).then( ()=>{} ) 
        fs.readFile(resource,function(err,data){
            if (err){
                    console.log(err.stack);
                    return {
                        "code":404,
                        "message":"Unable to access resource files!"
                    };
                }
                
                mResourceJson  = JSON.parse(data.toString());
                console.log(mResourceJson.listenPort + "--" + mResourceJson.listenIP );
                //读设定档里面的IP+Port
                // app.listen(mResourceJson.listenPort,mResourceJson.listenIP);
        });
    } 

//同步读取
export function fsreadFileSync() :any {
    //完成aop后，接下来学习的内容
    // JSON Schema
    // Promise.all([p1, p2, p3]).then( ()=>{} ) 
    mResourceJson = JSON.parse(fs.readFileSync(resource, 'utf-8'));
    return mResourceJson;
}
