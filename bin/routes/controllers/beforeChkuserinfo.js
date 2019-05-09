"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function beforeChkuserinfo() {
    return (target, methodName, descriptor) => {
        let callback = descriptor.value;
        descriptor.value = (param) => {
            target.userid = param.userid;
            target.username = param.username;
            //做个简单验证，是否为wait
            if (target.username.toLowerCase().indexOf("wait") != -1)
                target.username = "aop wait 被拦截！";
            callback(target);
        };
    };
}
exports.beforeChkuserinfo = beforeChkuserinfo;
//# sourceMappingURL=beforeChkuserinfo.js.map