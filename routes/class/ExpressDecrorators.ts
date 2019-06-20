import express from "express";
import {ActionMethod} from '../enum/EnumActionMethod';
import bodyParser from 'body-parser';
import { ok } from "assert";
/**
 * 功能说明：路由选择器
 * 作者:ricky
 */
export class ExpressDecrorators {

    private static _app: express.Express;
    static set app(value: express.Express) {
        ExpressDecrorators._app = value;
        let keys = ExpressDecrorators.controllerPath.keys(); 
        for (let i of keys) {
            ExpressDecrorators.setExpressRouter(i, ExpressDecrorators.controllerPath.get(i)!);
        } 
    };

    private static controllerPath: Map<any, string> = new Map<any, string>();
    private static controllerActions: Map<any, { method: ActionMethod, actionName: string, func: any }[]> = new Map<any, { method: ActionMethod, actionName: string, func: any }[]>();

    private static setExpressRouter(target: any, path: string) {
        let controllerActions = ExpressDecrorators.controllerActions.get(target);
        if (controllerActions) {
            //bodyParser 处理
            let jsonParser = bodyParser.json();
            let urlencodedParser = bodyParser.urlencoded({  
                extended: true, // 扩展
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
    static controller(path: string) {
        return (target: any) => { 
            if (!ExpressDecrorators._app) {
                ExpressDecrorators.controllerPath.set(target, path); 
            }
            else {
                ExpressDecrorators.setExpressRouter(target, path);
            }  
        }
    }

    static ALL() {
        return ExpressDecrorators.router(ActionMethod.all);
    }
    static POST() {
        return ExpressDecrorators.router(ActionMethod.post);
    }
    static GET() {
        return ExpressDecrorators.router(ActionMethod.get);
    }
    static PUT() {
        return ExpressDecrorators.router(ActionMethod.put);
    }
    static DEL() {
        return ExpressDecrorators.router(ActionMethod.delete);
    }

    static router(method: ActionMethod) {
        return (target: any, name: string, descriptor: PropertyDescriptor) => {
            let controllerActions = ExpressDecrorators.controllerActions.get(target);
            if (!controllerActions) {
                controllerActions = [];
                ExpressDecrorators.controllerActions.set(target, controllerActions);
            }
            controllerActions.push({ method: method, actionName: name, func: descriptor.value }); 
        }
    }
}