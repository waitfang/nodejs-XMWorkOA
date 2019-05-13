/**
 * 功能说明：测试的message写到这里。
 */
export enum enumMessage{

    /** aop wait 被拦截*/
    outcode=404,
    outstring="aop wait 被拦截！",
    
    /** 测试funtion 参数*/
    strValue ="测试funtion 参数:",
    
    /** 测试Write*/
    WriteString="测试Write function",

    /** handlermessage 测试用*/
    handlermessage="handlermessage 测试用",
 
    /**路由访问后的返回信息 */
    Returncode=200,
    Returnmessage="访问成功！",

    /**构造函数需要一个初始化值 */
    userInituserid=999999,
    userInitusername="999999",

    FileErr="文件读取失败！",

    ReturnDBData="数据库已创建"

}

export enum ReturnBoolean{
    No="false",
    Yes="true",
}