"use strict";
//功能说明：存放返回信息，状态，编号。
//作者：Wait
//创建时间：2019/04/27
Object.defineProperty(exports, "__esModule", { value: true });
class baseClass {
    //构造函数
    constructor(code, state, message) {
        this.code = 200;
        this.state = true;
        this.message = "";
        this.code = code;
        this.state = state;
        this.message = message;
    }
}
exports.baseClass = baseClass;
;
//# sourceMappingURL=_base.js.map