"use strict";
/***
 * 功能说明：用一个切口，check user值*
 */
let userinfo = require('./_user'); //引入class 
let outstring = "aop验证 name:";
// export module aop_user {
exports.aop_user = {
    Chkuserinfo: function (target) {
        console.log("Chkuserinfo");
        //参数赋值给class
        let objuserinfo = userinfo.constructor(target.userid, target.username);
        //这里做简单验证，看是不是wait
        if (target.username == "wait") {
            console.log(outstring + this.userid);
            objuserinfo = userinfo.user(target.userid, outstring); //根据条件，修改username，把修改之后的object返回。
        }
        else
            console.log(" aop_user userid=" + target.userid + " name:" + target.username);
        console.log("aop_user objuserinfo=" + objuserinfo);
        return objuserinfo;
    }
    // ,before:function(Chkuserinfo){
    //     var self = this;
    //     var outerArgs = Array.prototype.slice.call(arguments,1); 
    // }
};
// } 
//# sourceMappingURL=_aop_user.js.map