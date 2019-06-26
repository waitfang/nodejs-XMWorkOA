/**
 * 功能：链接MongoDB ，处理增删改查。
 * 作者：Wait
 * 时间：2019-05-13
 */

import {enumMessage} from '../enum/EnumMessage';
import {enumTables} from '../enum/EnumTables';
import { error } from 'util';
let MongoClient = require('mongodb').MongoClient; 

export class MongoDBConn<T> {
    private url = enumTables.mongodb;
    private client = MongoClient.connect(this.url);
    private useNewUrlParser = { useNewUrlParser: true };
    private Return   ={ReturnData:enumMessage.ReturnDBData};
    private enumTables = enumTables;
   
    /**CHECK  DB是否 链接成功 */
    MongoClientConn(callBack:Function){   
        return  MongoClient.connect(this.url, this.useNewUrlParser, 
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
        return MongoClient.connect(this.url,this.useNewUrlParser,(err:Error,client:any)=>{
            if (err) throw err;  
            let db = client.db(this.enumTables.myMongoDB); 
            let WhereParam =  this.FunWhereParam(StrWhereParam)
            db.collection(enumTables).find(WhereParam).toArray(function(err:Error, ReturnData:any) {
                if (err) throw err;
                console.log(ReturnData); 
                callBack(ReturnData);//结果返回给回调函数
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

    /**
     * 功能说明：新增一笔数据
     * @param enumTables 
     * @param insertParam 
     * @param callBack 
     */
    MOngoClientInsertOne(enumTables:string,insertParam:JSON,callBack:Function){
        return MongoClient.connect(this.url,this.useNewUrlParser,(err:Error,client:any)=>{
            if(err) throw err;
            let db = client.db(this.enumTables.myMongoDB);
            db.collection(enumTables).insertOne(insertParam,(err :Error,ReturnData:any)=>{
                if(err) throw err;
                callBack(ReturnData); 
            })
            client.close();
        });
    }


    /**
     * 功能说明：删除一笔数据
     * @param enumTables 
     * @param insertParam 
     * @param callBack 
     */
    MOngoClientdeleteOne(enumTables:string,insertParam:JSON,callBack:Function){
        return MongoClient.connect(this.url,this.useNewUrlParser,(err:Error,client:any)=>{
            if(err) throw err;
            let db = client.db(this.enumTables.myMongoDB);
            db.collection(enumTables).deleteOne(insertParam,(err :Error,ReturnData:any)=>{
                if(err) throw err;
                callBack(ReturnData); 
            })
            client.close();
        });
    }

    /**
     * 功能说明：删除多笔数据 deleteMany、deleteOne
     * @param enumTables 
     * @param insertParam 
     * @param callBack 
     */
    MOngoClientdelete(enumTables:string,insertParam:JSON,callBack:Function){
        return MongoClient.connect(this.url,this.useNewUrlParser,(err:Error,client:any)=>{
            if(err) throw err;
            let db = client.db(this.enumTables.myMongoDB);
            db.collection(enumTables).deleteMany(insertParam,(err :Error,ReturnData:any)=>{
                if(err) throw err;
                callBack(ReturnData); 
            })
            client.close();
        });
    }

    /**
     * 功能说明：修改数据
     * @param enumTables 
     * @param insertParam 
     * @param callBack 
     */
    MOngoClientupdateOne(enumTables:string,whereStr:JSON,setParam:JSON,callBack:Function){
        return MongoClient.connect(this.url,this.useNewUrlParser,(err:Error,client:any)=>{
            if(err) throw err;
            let db = client.db(this.enumTables.myMongoDB);
            var updateStr = {$set:setParam};
            db.collection(enumTables).updateOne(whereStr,updateStr,(err :Error,ReturnData:any)=>{
                if(err) throw err;
                callBack(ReturnData); 
            })
            client.close();
        });
    }

    MOngoClientupdateMany(enumTables:string,whereStr:JSON,setParam:JSON,callBack:Function){
        return MongoClient.connect(this.url,this.useNewUrlParser,(err:Error,client:any)=>{
            if(err) throw err;
            let db = client.db(this.enumTables.myMongoDB);
            var updateStr = {$set:setParam};
            db.collection(enumTables).updateMany(whereStr,updateStr,(err :Error,ReturnData:any)=>{
                if(err) throw err;
                callBack(ReturnData); 
            })
            client.close();
        });
    }

    
}

