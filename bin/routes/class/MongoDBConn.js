"use strict";
/**
 * 功能：链接MongoDB ，处理增删改查。
 * 作者：Wait
 * 时间：2019-05-13
 */
Object.defineProperty(exports, "__esModule", { value: true });
const EnumMessage_1 = require("../enum/EnumMessage");
const EnumTables_1 = require("../enum/EnumTables");
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/myMongoDB";
class MongoDBConn {
    constructor() {
        this.client = MongoClient.connect(url);
        this.useNewUrlParser = { useNewUrlParser: true };
        this.Return = { ReturnData: EnumMessage_1.enumMessage.ReturnDBData };
        this.enumTables = EnumTables_1.enumTables;
    }
    /**CHECK  DB是否 链接成功 */
    MongoClientConn(callBack) {
        return MongoClient.connect(url, this.useNewUrlParser, (err, db) => {
            if (err)
                throw err;
            console.log(this.Return);
            db.close();
            callBack(this.Return); //结果返回给回调函数
        });
    }
    ;
    /**
     * 功能说明：查询USERINFO记录
     * @param enumTables TABLE
     * @param param 参数
     * @param callBack 回调函数
     */
    MongoClientFind(enumTables, StrWhereParam, callBack) {
        return MongoClient.connect(url, this.useNewUrlParser, (err, client) => {
            if (err)
                throw err;
            let db = client.db(this.enumTables.myMongoDB);
            let WhereParam = this.FunWhereParam(StrWhereParam);
            db.collection(enumTables).find(WhereParam).toArray(function (err, ResultData) {
                if (err)
                    throw err;
                console.log(ResultData);
                callBack(ResultData); //结果返回给回调函数
            });
            client.close();
        });
    }
    ;
    /**
     *功能说明： 检查where条件是否有模糊查询，设定模糊查询
     */
    FunWhereParam(StrWhereParam) {
        let WhereParam = JSON.parse(StrWhereParam.toString()); //按条件查询 
        if (WhereParam.key == "")
            WhereParam = {}; //没有传入key，就查全部的
        delete WhereParam.key; //key只做判断用，不能用作where条件
        for (let Param in WhereParam) {
            let paramValue = WhereParam[Param];
            if (paramValue.indexOf(this.enumTables.regex) != -1) {
                WhereParam[Param] = new RegExp(paramValue.replace(this.enumTables.regex, "").toUpperCase()); //不区分大小写 实现模糊查询 
            }
        }
        return WhereParam;
    }
}
exports.MongoDBConn = MongoDBConn;
//# sourceMappingURL=MongoDBConn.js.map