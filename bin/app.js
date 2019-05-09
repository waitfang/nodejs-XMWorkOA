"use strict";
//功能说明：启动文件，
//作者：Wait
//创建时间：2019/04/27
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const log4js_1 = __importDefault(require("log4js")); //log4js 日志管理 
const fun_resource_1 = require("./routes/function/fun_resource"); //引入配置档读取功能
const ExpressDecrorators_1 = require("./routes/class/ExpressDecrorators");
const UserController_1 = require("./routes/controllers/UserController");
// fsreadJsonFile();//异步读取json配置
let mResourceJson = fun_resource_1.fsreadFileSync(); //同步读取
let listenIP = mResourceJson.listenIP; // //监听ip和端口 "localhost";
let listenPort = mResourceJson.listenPort; //8088; 
let log4jsConfigure = "public\\resource\\log4js.json"; //log4js 配置文件
log4js_1.default.configure(log4jsConfigure);
let app = express_1.default();
// app.use(bodyParser);
// app.use(bodyParser.urlencoded({ extended: true })); 
app.use(log4js_1.default.connectLogger(log4js_1.default.getLogger("default"), { level: 'auto' }));
ExpressDecrorators_1.ExpressDecrorators.app = app;
UserController_1.UserController; //引用路由页
app.listen(listenPort, listenIP);
//# sourceMappingURL=app.js.map