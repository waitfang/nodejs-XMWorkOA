export class BaseController{ 
    private static _Userinfo: any; //记录登陆者信息 
    static getUserinfo():any{
        return this._Userinfo;
    }
    static setUserinfo(user:any){
        this._Userinfo = user;
    }

}