"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 功能说明：测试的message写到这里。
 */
var enumMessage;
(function (enumMessage) {
    /** aop wait 被拦截*/
    enumMessage[enumMessage["outcode"] = 404] = "outcode";
    enumMessage["outstring"] = "aop wait \u88AB\u62E6\u622A\uFF01";
    /** 测试funtion 参数*/
    enumMessage["strValue"] = "\u6D4B\u8BD5funtion \u53C2\u6570:";
    /** 测试Write*/
    enumMessage["WriteString"] = "\u6D4B\u8BD5Write function";
    /** handlermessage 测试用*/
    enumMessage["handlermessage"] = "handlermessage \u6D4B\u8BD5\u7528";
    /**路由访问后的返回信息 */
    enumMessage[enumMessage["Returncode"] = 200] = "Returncode";
    enumMessage["Returnmessage"] = "\u8BBF\u95EE\u6210\u529F\uFF01";
    /**构造函数需要一个初始化值 */
    enumMessage[enumMessage["userInituserid"] = 999999] = "userInituserid";
    enumMessage["userInitusername"] = "999999";
})(enumMessage = exports.enumMessage || (exports.enumMessage = {}));
var ReturnBoolean;
(function (ReturnBoolean) {
    ReturnBoolean["No"] = "false";
    ReturnBoolean["Yes"] = "true";
})(ReturnBoolean = exports.ReturnBoolean || (exports.ReturnBoolean = {}));
//# sourceMappingURL=EnumMessage.js.map