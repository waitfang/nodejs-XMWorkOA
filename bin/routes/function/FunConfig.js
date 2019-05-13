"use strict";
//功能说明：读取resource信息。
//作者：Wait
//创建时间：2019/04/27
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
let resource = "public\\resource\\config.json"; //文本信息放入json档
let config = '../../public/resource/config.json';
var mResourceJson;
let app = express_1.default();
// exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口
//异步读取
function fsreadJsonFile() {
    //完成aop后，接下来学习的内容
    // JSON Schema
    // Promise.all([p1, p2, p3]).then( ()=>{} ) 
    return fs_1.default.readFile(resource, function (err, data) {
        mResourceJson = JSON.parse(data.toString());
        console.log(mResourceJson.listenPort + "--" + mResourceJson.listenIP);
    });
}
exports.fsreadJsonFile = fsreadJsonFile;
//同步读取
function fsreadFileSync() {
    //完成aop后，接下来学习的内容
    // JSON Schema
    // Promise.all([p1, p2, p3]).then( ()=>{} ) 
    mResourceJson = JSON.parse(fs_1.default.readFileSync(resource, 'utf-8'));
    return mResourceJson;
}
exports.fsreadFileSync = fsreadFileSync;
//# sourceMappingURL=FunConfig.js.map