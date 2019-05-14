"use strict";
//功能说明：启动文件，
//作者：Wait
//创建时间：2019/04/27
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserClass_1 = require("./routes/class/UserClass");
const FunAopUser_1 = require("./routes/function/FunAopUser");
let Rs = require('./routes/controllers/_resource'); //引入配置档读取功能
let app = express_1.default();
let mResourceJson = Rs.fsreadFile.fsreadFile(); //调用resource公开的接口
Rs.fsreadFile.fswriteFile(); //测试写入方法是否正常访问 
//监听ip和端口
let listenIP = "localhost";
let listenPort = 8088;
let user = new UserClass_1.userClass(999, "000000"); //需要实例化，所以先给定一个值
//验证aop
app.all("/user", function (req, res, next) {
    //获取到的参数赋值给user object
    user.userid = parseInt(req.query.userid);
    user.username = req.query.username;
    let userBack = UserClass_1.userClass.getUserInfo(user); //呼叫class的function 　返回值未ｎｕｌｌ
    let userBack2 = user.getUserInfo2(user); //呼叫class的function 有返回值
    console.log("app callback = " + userBack + "　app userBack2 = " + userBack2);
    let funUser = FunAopUser_1.funGetuser(user);
    res.send({ id: userBack2.userid, name: userBack2.username });
});
app.listen(listenPort, listenIP);
module.exports = app;
//# sourceMappingURL=bak.app.js.map