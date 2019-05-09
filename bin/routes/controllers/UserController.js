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
const enumMessage_1 = require("../enum/enumMessage");
const user_1 = require("../class/user");
let UserController = class UserController {
    /**
     * api = http://localhost:8088/xm/getUserInfo     *
     * url = listen(listenPort,listenIP) + controller Path +  function Name
     * @param req
     * @param res
     * @param next
     */
    static getUserInfo(req, res, next) {
        res.json({
            code: enumMessage_1.enumMessage.Returncode,
            message: enumMessage_1.enumMessage.Returnmessage,
            reqkey: req.query.userid,
            reqvalue: req.query.username,
        });
    }
    /**
     * 功能说明：验证输入的userinfo是否正确
     * api = http://localhost:8088/xm/Chkuserinfo     *
     * @param req
     * @param res
     * @param next
     */
    static Chkuserinfo(req, res, next) {
        let user = new user_1.userClass(enumMessage_1.enumMessage.userInituserid, enumMessage_1.enumMessage.userInitusername); //需要实例化，所以先给定一个值
        if (req.query.userid != null && req.query.username != null) {
            user.userid = req.query.userid;
            user.username = req.query.username;
        }
        //call 逻辑处理部分
        user_1.userClass.getUserInfo(user);
        //class to json 直接输出
        let jsonData = user_1.userClass.getUserInfoJson(user);
        if (user.userid == enumMessage_1.enumMessage.outcode) {
            res.json(JSON.parse(jsonData));
        }
        else {
            res.json({
                code: enumMessage_1.enumMessage.Returncode,
                message: enumMessage_1.enumMessage.Returnmessage,
                reqkey: user.userid,
                reqvalue: user.username,
            });
        }
    }
};
__decorate([
    ExpressDecrorators_1.ExpressDecrorators.GET(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController, "getUserInfo", null);
__decorate([
    ExpressDecrorators_1.ExpressDecrorators.ALL(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController, "Chkuserinfo", null);
UserController = __decorate([
    ExpressDecrorators_1.ExpressDecrorators.controller("xm")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map