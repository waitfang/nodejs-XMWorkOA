import fs, { promises }  from 'fs';   
let config =  "public\\resource\\config.json";//文本信息放入json档
export class ReadFileConfig {

    static  async ReadFileConfig ():Promise<any>{
         return await new Promise((resolve,reject)=>{
            ReadFileConfig.ReadFile;
        }); 
    }


    static ReadFile = fs.readFile(config,function(err,data){
           return JSON.parse(data.toString()); 
     }); 

} 
