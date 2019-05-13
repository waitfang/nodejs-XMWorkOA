export interface iUserInfo extends iBase {
    USERID :number;
    USERNAME:string;
    USERPASSWORD:string;
    EMAIL:string;
    COMPANYID:string;
    COMPANYNAME:string;
    CREATETIME:Date;
    CREATEUSER:string;
    REMARKS:string;
}