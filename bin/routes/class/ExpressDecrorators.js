"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            for (let i of controllerActions) {
                console.log(i.method, `/${path}/${i.actionName}`);
                ExpressDecrorators._app[i.method](`/${path}/${i.actionName}`, i.func);
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
        return ExpressDecrorators.router("all");
    }
    static POST() {
        return ExpressDecrorators.router("post");
    }
    static GET() {
        return ExpressDecrorators.router("get");
    }
    static PUT() {
        return ExpressDecrorators.router("put");
    }
    static DELETE() {
        return ExpressDecrorators.router("delete");
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