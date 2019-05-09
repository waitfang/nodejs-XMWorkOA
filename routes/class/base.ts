//功能说明：存放返回信息，状态，编号。
//作者：Wait
//创建时间：2019/04/27

export class baseClass {    
    public code:number = 200;
    public state:boolean = true;
    public message:string ="";

    //构造函数
    public constructor(code:number,state:boolean,message:string){
        this.code = code;
        this.state = state;
        this.message=message;
    }  
 
};
 

