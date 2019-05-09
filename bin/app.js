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
const log4js_1 = __importDefault(require("log4js")); //log4js 日志管理 
const morgan_1 = __importDefault(require("morgan")); //nodejs 日志管理
// fsreadJsonFile();//异步读取json配置
let mResourceJson = fun_resource_1.fsreadFileSync(); //同步读取
//监听ip和端口
let listenIP = mResourceJson.listenIP; // "localhost";
let listenPort = mResourceJson.listenPort; //8088; 
let log4jsConfigure = "public\\resource\\log4js.json"; //log4js 配置文件
let app = express_1.default();
// app.use(bodyParser);
// app.use(bodyParser.urlencoded({ extended: true }));
log4js_1.default.configure(log4jsConfigure);
app.use(log4js_1.default.connectLogger(log4js_1.default.getLogger("default"), { level: 'auto' }));
app.use(morgan_1.default("dev")); //日志打印到控制台 
// ExpressDecrorators.app = app;
// UserController; //引用路由页
app.get("*/xm/Chkuserinfo", (req, res, next) => {
    res.json({ message: "测试用！" });
});
app.listen(listenPort, listenIP);
//# sourceMappingURL=app.js.map