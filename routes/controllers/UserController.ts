import { ExpressDecrorators } from "../class/ExpressDecrorators";
import express from 'express';
import {enumMessage} from '../enum/EnumMessage';
import { NextFunction } from "connect";
import {userClass} from "../class/UserClass"; 
import { json } from "body-parser";
import {MongoDBConn} from '../class/MongoDBConn';
import {iUserInfo} from '../interface/iUserInfo';
import   {enumTables}    from '../enum/EnumTables'

@ExpressDecrorators.controller("xm")
export class UserController{
 
    private enumTables = enumTables;
    
    /**
     * 功能说明：验证输入的userinfo是否正确
     * api = http://localhost:8088/xm/Chkuserinfo     * 
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.ALL()
    static Chkuserinfo(req:express.Request,res:express.Response,next : NextFunction){
        let user= new userClass(enumMessage.userInituserid,enumMessage.userInitusername);//需要实例化，所以先给定一个值
        if(req.query.userid !=null && req.query.username !=null){
            user.userid = req.query.userid;
            user.username = req.query.username;
        }
        //call 逻辑处理部分
        userClass.getUserInfo(user);  
                
        //class to json 直接输出
        let JsonData =  userClass.getUserInfoJson(user);  

        if(user.userid ==enumMessage.outcode )
        {
            res.json(JSON.parse(JsonData));
        }
        else
        {
            res.json({
                code:  enumMessage.Returncode,
                message: enumMessage.Returnmessage,
                reqkey: user.userid,
                reqvalue: user.username,
            });
        }
    }
 
    /**
     * api = http://localhost:8088/xm/getUserInfo     * 
     * url = listen(listenPort,listenIP) + controller Path +  function Name 
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.GET()
    static FindUserInfo(req:express.Request,res:express.Response,next :express.NextFunction){ 
        let objUserInfo = <iUserInfo>{}; 
        objUserInfo.key= req.query.username;
        objUserInfo.USERNAME=  enumTables.regex + req.query.username.toUpperCase(); //enumTables.regex  设定栏位是否需要模糊查询

       let JsonParam =   JSON.stringify(objUserInfo);
       new MongoDBConn<iUserInfo>().MongoClientFind(enumTables.USERINFO ,JsonParam,(ReturnData:JSON)=>{
           let vReturnData :JSON = ReturnData;
           res.json(ReturnData);
       });
    }

    /**
     * 功能说明：新增一笔数据到userinfo
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.POST()
    static InsertOneUserInfo(req:express.Request,res:express.Response,next :express.NextFunction){
        let objUserInfo = <iUserInfo>{};         
        objUserInfo.USERID = req.body.userid;
        objUserInfo.USERNAME = req.body.username.toUpperCase(); 
        objUserInfo.USERPASSWORD = req.body.userpassword;
        objUserInfo.EMAIL=req.body.username+"@gmail.com";
        objUserInfo.COMPANYID =  req.body.companyid;
        objUserInfo.COMPANYNAME = req.body.companyname;
        objUserInfo.CREATETIME = new Date();
        objUserInfo.CREATEUSER="system"
        objUserInfo.REMARKS = "system";

        let JsonParam = JSON.parse(JSON.stringify( objUserInfo));
        new MongoDBConn().MOngoClientInsertOne(enumTables.USERINFO,JsonParam,(ReturnData:JSON)=>{
            res.json(ReturnData);
        });
    }


    /**
     * 功能说明：删除一笔数据到userinfo
     * @param req 
     * @param res 
     * @param next 
     */
    @ExpressDecrorators.DEL()
    static DeleteOneUserInfo(req:express.Request,res:express.Response,next :express.NextFunction){
        let objUserInfo = <iUserInfo>{}; 
        objUserInfo.USERNAME = req.query.username.toUpperCase();  

        let JsonParam = JSON.parse(JSON.stringify( objUserInfo));
        new MongoDBConn().MOngoClientdeleteOne(enumTables.USERINFO,JsonParam,(ReturnData:JSON)=>{
            res.json(ReturnData);
        });
    }

    
    /**
     *功能说明： checked MongoDB 
     * api = http://localhost:8088/xm/MongoDBConn  
     *  */
    @ExpressDecrorators.ALL()
    static ClientMongoDBConn (req:express.Request,res:express.Response,next:NextFunction){

       let  returnMongoClientConn = new MongoDBConn<iUserInfo>().MongoClientConn(
           (ReturnData:JSON)=>{
                res.json(ReturnData);
            }
       ); 
    } 
    
    
}