/**
 * 功能说明：DB相关。
 */
export enum enumTables{ 
    mongodb="mongodb://localhost:27017/myMongoDB",
    myMongoDB="myMongoDB",

    COMPANYINFO="COMPANYINFO",
    USERINFO="USERINFO",//人员基本档
    USERTOROLE="USERTOROLE",//人员角色对照档
    ROLEINFO="ROLEINFO",//角色档
    ROLETOFUNCTION="ROLETOFUNCTION",//角色功能对照档
    


    regex ="$regex:" //设置查询栏位需要模糊查询
}
 