"use strict";
//功能说明：启动文件，
//作者：Wait
//创建时间：2019/04/27
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fun_resource_1 = require("./routes/function/fun_resource"); //引入配置档读取功能
const ExpressDecrorators_1 = require("./routes/class/ExpressDecrorators");
const UserController_1 = require("./routes/controllers/UserController");
// fsreadJsonFile();//异步读取json配置
let mResourceJson = fun_resource_1.fsreadFileSync(); //同步读取
//监听ip和端口
let listenIP = mResourceJson.listenIP; // "localhost";
let listenPort = mResourceJson.listenPort; //8088; 
let app = express_1.default();
ExpressDecrorators_1.ExpressDecrorators.app = app;
UserController_1.UserController; //引用路由页
app.listen(listenPort, listenIP);
//# sourceMappingURL=app.js.map