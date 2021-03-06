//功能说明：启动文件，
//作者：Wait
//创建时间：2019/04/27

import express, { Request, Response, NextFunction } from 'express';  
import  {userClass} from './routes/class/UserClass';
import {funGetuser, beforeChkuserinfo} from './routes/function/FunAopUser';
let Rs  =  require('./routes/controllers/_resource');//引入配置档读取功能
let app = express();

let mResourceJson = Rs.fsreadFile.fsreadFile();//调用resource公开的接口
Rs.fsreadFile.fswriteFile();//测试写入方法是否正常访问 
 
//监听ip和端口
let listenIP = "localhost";
let listenPort=8088;

let user= new userClass(999,"000000");//需要实例化，所以先给定一个值
//验证aop
app.all("/user",function(req,res,next){ 

    //获取到的参数赋值给user object
    user.userid=parseInt(req.query.userid);  
    user.username=req.query.username;  

    let userBack=  userClass.getUserInfo(user);//呼叫class的function 　返回值未ｎｕｌｌ
    let userBack2=  user.getUserInfo2(user);//呼叫class的function 有返回值
    console.log("app callback = "+userBack+"　app userBack2 = "+userBack2)
     
    let funUser :userClass =  funGetuser(user);

    res.send({id :userBack2.userid,name:userBack2.username});
});
 



app.listen(listenPort,listenIP);
module.exports = app;