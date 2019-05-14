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
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
const FunAopUser_1 = require("../function/FunAopUser"); //引入aop ts  
class userClass extends Base_1.baseClass {
    constructor(userid, username) {
        super(200, true, "constructor"); //调用父类的构造函数，需要初始化
        //getUserInfo 做一个装饰器 ,也就是aop 
        this.getUserInfo2 = (params) => {
            //参数做一个装配，处理业务逻辑，然后再返回
            let objuserClass = new userClass(params.userid, params.username);
            console.log("Class getUserInfo userid=" + objuserClass.userid + " name:" + objuserClass.username);
            return objuserClass;
        };
        this.userid = userid;
        this.username = username;
    }
    static getUserInfo(params) {
        //参数做一个装配，处理业务逻辑，然后再返回
        let objuserClass = new userClass(params.userid, params.username);
        console.log("Class getUserInfo userid=" + objuserClass.userid + " name:" + objuserClass.username);
        return objuserClass;
    }
    //返回json数据
    static getUserInfoJson(params) {
        //参数做一个装配，处理业务逻辑，然后再返回
        let objuserClass = new userClass(params.userid, params.username);
        return JSON.stringify(objuserClass);
    }
    //根据id获取name  return 在app.ts 收不到返回值
    getusername(userid) {
        this.username = userid.toString();
        return this.username;
    }
}
__decorate([
    FunAopUser_1.beforeChkuserinfo(),
    __metadata("design:type", Object)
], userClass.prototype, "getUserInfo2", void 0);
__decorate([
    FunAopUser_1.beforeChkuserinfo(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userClass]),
    __metadata("design:returntype", userClass)
], userClass, "getUserInfo", null);
exports.userClass = userClass;
;
//# sourceMappingURL=UserClass.js.map