"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Beforuser() {
    return (target, methodName, descriptor) => {
        let oldValue = descriptor.value; //相当于回调函数
        descriptor.value = (target) => {
            target.username = "aop beforeChkuserinfo";
            console.log("methodName=" + methodName);
            oldValue(target);
        };
    };
}
exports.Beforuser = Beforuser;
//# sourceMappingURL=Beforuser.js.map