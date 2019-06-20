//功能说明：读取resource信息。
//作者：Wait
//创建时间：2019/04/27

import express, { Request, Response, NextFunction } from 'express'; 
import fs from 'fs';
import { json } from 'body-parser';
import {enumMessage} from '../enum/EnumMessage';
import {EumnRedis} from '../enum/EumnRedis';
import { RedisController } from '../controllers/RedisController';
let resource =  "public\\resource\\config.json";//文本信息放入json档
let leftTree = 'public/resource/leftTree.json';//功能菜单
let config = '../../public/resource/config.json';
var mResourceJson;
let app = express();

// exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口
//异步读取
export function fsreadJsonFile() :any {
        //完成aop后，接下来学习的内容
        // JSON Schema
        // Promise.all([p1, p2, p3]).then( ()=>{} ) 
       return  fs.readFile(resource,function(err,data){
                mResourceJson  = JSON.parse(data.toString());
                console.log(mResourceJson.listenPort + "--" + mResourceJson.listenIP ); 
        });
    } 

// 功能说明：leftTree读入到redis中
export function fsreadTree() :any { 
    return  fs.readFile(leftTree,function(err,data){
            mResourceJson  = data.toString();
            RedisController.client.set(EumnRedis.leftTree ,mResourceJson); 
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
