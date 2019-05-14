"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionMethod_1 = require("../enum/ActionMethod");
const body_parser_1 = __importDefault(require("body-parser"));
/**
 * 功能说明：路由选择器
 * 作者:ricky
 */
class ExpressDecrorators {
    static set app(value) {
        ExpressDecrorators._app = value;
        let keys = ExpressDecrorators.controllerPath.keys();
        for (let i of keys) {
            ExpressDecrorators.setExpressRouter(i, ExpressDecrorators.controllerPath.get(i));
        }
    }
    ;
    static setExpressRouter(target, path) {
        let controllerActions = ExpressDecrorators.controllerActions.get(target);
        if (controllerActions) {
            //bodyParser 处理
            let jsonParser = body_parser_1.default.json();
            let urlencodedParser = body_parser_1.default.urlencoded({
                extended: true,
                limit: 1024 * 1024 * 2 // 前端最大可提交数据限制
            });
            for (let i of controllerActions) {
                console.log(i.method, `/${path}/${i.actionName}`);
                ExpressDecrorators._app[i.method](`/${path}/${i.actionName}`, i.func);
                // ExpressDecrorators._app[i.method](`/${path}/${i.actionName}`,urlencodedParser, i.func);
                // ExpressDecrorators._app[i.method](`/${path}/${i.actionName}`,jsonParser, i.func); 
            }
        }
        ExpressDecrorators.controllerPath.delete(target);
    }
    /**
     *
     * @param path 目录路径，例 "path" , "system/user"
     */
    static controller(path) {
        return (target) => {
            if (!ExpressDecrorators._app) {
                ExpressDecrorators.controllerPath.set(target, path);
            }
            else {
                ExpressDecrorators.setExpressRouter(target, path);
            }
        };
    }
    static ALL() {
        return ExpressDecrorators.router(ActionMethod_1.ActionMethod.all);
    }
    static POST() {
        return ExpressDecrorators.router(ActionMethod_1.ActionMethod.post);
    }
    static GET() {
        return ExpressDecrorators.router(ActionMethod_1.ActionMethod.get);
    }
    static PUT() {
        return ExpressDecrorators.router(ActionMethod_1.ActionMethod.put);
    }
    static DELETE() {
        return ExpressDecrorators.router(ActionMethod_1.ActionMethod.delete);
    }
    static router(method) {
        return (target, name, descriptor) => {
            let controllerActions = ExpressDecrorators.controllerActions.get(target);
            if (!controllerActions) {
                controllerActions = [];
                ExpressDecrorators.controllerActions.set(target, controllerActions);
            }
            controllerActions.push({ method: method, actionName: name, func: descriptor.value });
        };
    }
}
ExpressDecrorators.controllerPath = new Map();
ExpressDecrorators.controllerActions = new Map();
exports.ExpressDecrorators = ExpressDecrorators;
//# sourceMappingURL=ExpressDecrorators.js.map