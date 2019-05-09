"use strict";
/***
 * 功能说明：用一个切口，check user值*
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enumMessage_1 = require("../enum/enumMessage");
/**
 * aop checked 用户名称
 */
function beforeChkuserinfo() {
    return (target, methodName, descriptor) => {
        if (descriptor == null)
            return;
        let callback = descriptor.value;
        descriptor.value = (param) => {
            //做个简单验证，是否为wait
            if (param.username.toLowerCase().indexOf("wait") != -1)
                param.username = enumMessage_1.enumMessage.outstring;
            callback(param);
        };
    };
}
exports.beforeChkuserinfo = beforeChkuserinfo;
function funGetuser(param) {
    console.log(enumMessage_1.enumMessage.strValue + param.username);
    param.username = enumMessage_1.enumMessage.strValue;
    return param;
}
exports.funGetuser = funGetuser;
//# sourceMappingURL=_aop_user.js.map