import amqplib from 'amqplib'; 
import log4js from 'log4js';

/**
 * 功能说明：用来处理消息队列
 */

export class RedisController{

    private amqpUrl = 'amqp://admin:admin@172.16.31.229';
    private QueueName= 'QueueName';  
    // private connection = amqp.createConnection({url: "amqp://localhost"});
    //消息队列消费者
    rabbitmqConsume(){
        var salf = this;
        amqplib.connect(salf.amqpUrl).then(function(conn){ 
            //链接成功后，创建通道
            return conn.createChannel().then(function(channel){               
                //assertQueue 监听QueueName队列。
                var ok = channel.assertQueue(salf.QueueName,{durable:false}).then(function(_qok){                    
                    let ErrData:any = [];//存放异常data
                    let i = 0, iErrData = -2;//跑三次，还是同一个错误，就不用再入队列了。
                    //监听成功后，创建一个消费者。
                    return channel.consume(salf.QueueName,function(msg:any){   
                        //取消息列表中的数据，做逻辑处理。
                        try {
                            //测试异常重新入队。
                            if(JSON.parse(msg.content.toString()).USERNAME=="WAIT") var obj = JSON.parse(msg); 
                            channel.ack(msg);//清队列。
                        } catch (error) {  
                            if(iErrData<=i)  //跑三次，还是同一个错误，就不用再入队列了。
                                channel.nack(msg); //出现异常，重新入队列。
                            else
                                channel.ack(msg);//清队列。 

                            //重新入队后，错误的msg写入log档，方便查看。
                            if(ErrData.indexOf(msg.content.toString()) ==-1){
                                const logger =  log4js.getLogger('errors') 
                                logger.error(error+ " = msgData = "+msg.content.toString()) 
                                ErrData[i] = msg.content.toString();
                                i++;
                            }   
                            iErrData++;                         
                        } 
                    },{noAck:false});  //noAck:true 不管是否成功，都清队列。  
                });                
                //监听完成后
                return ok.then(function(_consumeOK){
                    console.log('_consumeOK=='+_consumeOK); 
                });
            });
        });
    }

    //消息队列创建者
    rabbitmqQueue(data:string){
        var salf = this;  
        amqplib.connect(salf.amqpUrl).then(function(conn){ 
            //链接成功后，创建通道
            return conn.createChannel().then(function(channel){               
                //assertQueue 监听QueueName队列。
                var ok = channel.assertQueue(salf.QueueName,{durable:false}).then(function(_qok){
                    //data add Queue 数据存放到消息队列中。 
                    return channel.sendToQueue(salf.QueueName,Buffer.from(data),{persistent:true}); 
                })
                .then(function(data){
                    console.log('consume=='+data);
                    channel.close();
                })                
                //监听完成后
                return ok.then(function(_consumeOK){
                    console.log('_consumeOK=='+_consumeOK); 
                });
            });
        });
    }

}