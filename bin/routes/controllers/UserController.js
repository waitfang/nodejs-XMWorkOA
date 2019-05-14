"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressDecrorators_1 = require("../class/ExpressDecrorators");
const express_1 = __importDefault(require("express"));
const EnumMessage_1 = require("../enum/EnumMessage");
const UserClass_1 = require("../class/UserClass");
const MongoDBConn_1 = require("../class/MongoDBConn");
const EnumTables_1 = require("../enum/EnumTables");
let UserController = class UserController {
    constructor() {
        this.enumTables = EnumTables_1.enumTables;
    }
    /**
     * 功能说明：验证输入的userinfo是否正确
     * api = http://localhost:8088/xm/Chkuserinfo     *
     * @param req
     * @param res
     * @param next
     */
    static Chkuserinfo(req, res, next) {
        let user = new UserClass_1.userClass(EnumMessage_1.enumMessage.userInituserid, EnumMessage_1.enumMessage.userInitusername); //需要实例化，所以先给定一个值
        if (req.query.userid != null && req.query.username != null) {
            user.userid = req.query.userid;
            user.username = req.query.username;
        }
        //call 逻辑处理部分
        UserClass_1.userClass.getUserInfo(user);
        //class to json 直接输出
        let JsonData = UserClass_1.userClass.getUserInfoJson(user);
        if (user.userid == EnumMessage_1.enumMessage.outcode) {
            res.json(JSON.parse(JsonData));
        }
        else {
            res.json({
                code: EnumMessage_1.enumMessage.Returncode,
                message: EnumMessage_1.enumMessage.Returnmessage,
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
    static FindUserInfo(req, res, next) {
        let objUserInfo = {};
        objUserInfo.key = req.query.username;
        objUserInfo.USERNAME = EnumTables_1.enumTables.regex + req.query.username.toUpperCase(); //enumTables.regex  设定栏位是否需要模糊查询
        let JsonParam = JSON.stringify(objUserInfo);
        new MongoDBConn_1.MongoDBConn().MongoClientFind(EnumTables_1.enumTables.USERINFO, JsonParam, (ReturnData) => {
            let vReturnData = ReturnData;
            res.json(ReturnData);
        });
    }
    /**
     * 功能说明：新增一笔数据到userinfo
     * @param req
     * @param res
     * @param next
     */
    static InsertOneUserInfo(req, res, next) {
        let objUserInfo = {};
        objUserInfo.USERID = req.query.userid;
        objUserInfo.USERNAME = req.query.username.toUpperCase();
        objUserInfo.USERPASSWORD = req.query.userpassword;
        objUserInfo.EMAIL = req.query.username + "@gmail.com";
        objUserInfo.COMPANYID = req.query.companyid;
        objUserInfo.COMPANYNAME = req.query.companyname;
        objUserInfo.CREATETIME = new Date();
        objUserInfo.CREATEUSER = "system";
        objUserInfo.REMARKS = "system";
        let JsonParam = JSON.parse(JSON.stringify(objUserInfo));
        new MongoDBConn_1.MongoDBConn().MOngoClientInsertOne(EnumTables_1.enumTables.USERINFO, JsonParam, (ReturnData) => {
            res.json(ReturnData);
        });
    }
    /**
     * 功能说明：删除一笔数据到userinfo
     * @param req
     * @param res
     * @param next
     */
    static DeleteOneUserInfo(req, res, next) {
        let objUserInfo = {};
        objUserInfo.USERNAME = req.query.username.toUpperCase();
        let JsonParam = JSON.parse(JSON.stringify(objUserInfo));
        new MongoDBConn_1.MongoDBConn().MOngoClientdeleteOne(EnumTables_1.enumTables.USERINFO, JsonParam, (ReturnData) => {
            res.json(ReturnData);
        });
    }
    /**
     *功能说明： checked MongoDB
     * api = http://localhost:8088/xm/MongoDBConn
     *  */
    static ClientMongoDBConn(req, res, next) {
        let returnMongoClientConn = new MongoDBConn_1.MongoDBConn().MongoClientConn((ReturnData) => {
            res.json(ReturnData);
        });
    }
};
__decorate([
    ExpressDecrorators_1.ExpressDecrorators.ALL(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController, "Chkuserinfo", null);
__decorate([
    ExpressDecrorators_1.ExpressDecrorators.GET(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController, "FindUserInfo", null);
__decorate([
    ExpressDecrorators_1.ExpressDecrorators.ALL(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController, "InsertOneUserInfo", null);
__decorate([
    ExpressDecrorators_1.ExpressDecrorators.ALL(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController, "DeleteOneUserInfo", null);
__decorate([
    ExpressDecrorators_1.ExpressDecrorators.ALL(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController, "ClientMongoDBConn", null);
UserController = __decorate([
    ExpressDecrorators_1.ExpressDecrorators.controller("xm")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map