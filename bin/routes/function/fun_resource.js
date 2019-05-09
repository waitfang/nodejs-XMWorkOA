"use strict";
//功能说明：读取resource信息。
//作者：Wait
//创建时间：2019/04/27
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enumMessage_1 = require("../enum/enumMessage");
const fs_1 = __importDefault(require("fs"));
let resource = "public\\resource\\resource.json"; //文本信息放入json档
var mResourceJson;
let app = express_1.default();
// exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口
exports.fsreadFile =
    {
        fsreadFile: function () {
            //完成aop后，接下来学习的内容
            // JSON Schema
            // Promise.all([p1, p2, p3]).then( ()=>{} ) 
            fs_1.default.readFile(resource, function (err, data) {
                if (err) {
                    console.log(err.stack);
                    return {
                        "code": 404,
                        "message": "Unable to access resource files!"
                    };
                }
                mResourceJson = JSON.parse(data.toString());
                console.log(mResourceJson.listenPort + "--" + mResourceJson.listenIP);
                //读设定档里面的IP+Port
                app.listen(mResourceJson.listenPort, mResourceJson.listenIP);
            });
        },
        fswriteFile: function () {
            console.log(enumMessage_1.enumMessage.WriteString);
        }
    };
//异步读取
function fsreadJsonFile() {
    //完成aop后，接下来学习的内容
    // JSON Schema
    // Promise.all([p1, p2, p3]).then( ()=>{} ) 
    fs_1.default.readFile(resource, function (err, data) {
        if (err) {
            console.log(err.stack);
            return {
                "code": 404,
                "message": "Unable to access resource files!"
            };
        }
        mResourceJson = JSON.parse(data.toString());
        console.log(mResourceJson.listenPort + "--" + mResourceJson.listenIP);
        //读设定档里面的IP+Port
        // app.listen(mResourceJson.listenPort,mResourceJson.listenIP);
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
//# sourceMappingURL=fun_resource.js.map