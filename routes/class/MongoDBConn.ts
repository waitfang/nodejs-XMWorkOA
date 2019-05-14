/**
 * 功能：链接MongoDB ，处理增删改查。
 * 作者：Wait
 * 时间：2019-05-13
 */

import {enumMessage} from '../enum/EnumMessage';
import {enumTables} from '../enum/EnumTables';
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/myMongoDB";


export class MongoDBConn<T> {
    private client = MongoClient.connect(url);
    private useNewUrlParser = { useNewUrlParser: true };
    private Return   ={ReturnData:enumMessage.ReturnDBData};
    private enumTables = enumTables;
    /**CHECK  DB是否 链接成功 */
    MongoClientConn(callBack:Function){   
        return  MongoClient.connect(url, this.useNewUrlParser, 
            (err: any, db: { close: () => void; }) => {
                if (err) throw err;
                console.log(this.Return);
                db.close(); 
                callBack(this.Return);//结果返回给回调函数
            }
        );
    };



    /**
     * 功能说明：查询USERINFO记录
     * @param enumTables TABLE 
     * @param param 参数
     * @param callBack 回调函数
     */
    MongoClientFind(enumTables:string ,StrWhereParam:String, callBack:Function) {
        return MongoClient.connect(url,this.useNewUrlParser,(err:Error,client:any)=>{
            if (err) throw err;  
            let db = client.db(this.enumTables.myMongoDB); 
            let WhereParam =  this.FunWhereParam(StrWhereParam)
            db.collection(enumTables).find(WhereParam).toArray(function(err:Error, ResultData:any) {
                if (err) throw err;
                console.log(ResultData); 
                callBack(ResultData);//结果返回给回调函数
            });
            client.close();
        })
        
    };

    /**
     *功能说明： 检查where条件是否有模糊查询，设定模糊查询
     */
    FunWhereParam(StrWhereParam : String){
        let WhereParam = JSON.parse(StrWhereParam.toString());//按条件查询 
        if(WhereParam.key=="") WhereParam = {} //没有传入key，就查全部的
        delete WhereParam.key; //key只做判断用，不能用作where条件
        for(let Param in WhereParam){
            let paramValue = WhereParam[Param];
            if(paramValue.indexOf(this.enumTables.regex) != -1){
                WhereParam[Param] =new RegExp(paramValue.replace(this.enumTables.regex,"").toUpperCase());//不区分大小写 实现模糊查询 
            }
        }   
        return WhereParam;
    }
    
}

