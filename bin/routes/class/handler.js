"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const EnumMessage_1 = require("../enum/EnumMessage");
class handler extends base_1.baseClass {
    constructor() {
        super(...arguments);
        this.addclickHandler = (e) => {
            this.message = EnumMessage_1.enumMessage.handlermessage;
        };
    }
}
exports.handler = handler;
//# sourceMappingURL=handler.js.map