"use strict";
/**
 * 功能说明：人员class，继承base，让返回的code，message统一
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
let aop_user = require("./_aop_user");
// export class user extends base{
class userClass {
    constructor(userid, username) {
        // super(200,true,"init");//调用父类的构造函数，需要初始化
        this.userid = userid;
        this.username = username;
        console.log("初始化userClass constructor");
    }
    //getUserInfo 做一个装饰器 ,也就是aop
    getUserInfo(params) {
        this.userid = params.userid;
        this.username = params.username;
        console.log(" getUserInfo userid=" + this.userid + " name:" + this.username);
        return this;
    }
    //根据id获取name
    getusername(userid) {
        this.username = userid.toString();
        return this.username;
    }
}
__decorate([
    aop_user.Chkuserinfo
], userClass.prototype, "getUserInfo", null);
exports.userClass = userClass;
;
module.exports = userClass;
// export default userClass;
// var userClass = new userClass(999,"000");//初始化必须要有值 
// module.exports.userinfo.user.userid = classuser.userid;
// module.exports.userinfo.user.getUserInfo =classuser.getUserInfo;
// module.exports.userinfo.user.getusername = classuser.getusername;
//# sourceMappingURL=_user.js.map