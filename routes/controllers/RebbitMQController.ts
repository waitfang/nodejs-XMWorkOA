import amqplib from 'amqplib'; 
import log4js from 'log4js';
/**
 * 功能说明：用来处理消息队列
 */
export class RebbitMQController{
    private amqpUrl = 'amqp://admin:admin@localhost';
    private QueueName= 'QueueName'; 
    private logger =  log4js.getLogger('errors');//写log档    
    //消息队列消费者
    rabbitmqConsume(){
        var salf = this;
        amqplib.connect(salf.amqpUrl).then(function(conn){ 
            //链接成功后，创建通道
            return conn.createChannel().then(function(channel){               
                //assertQueue 监听QueueName队列。
                var ok = channel.assertQueue(salf.QueueName,{durable:false}).then(function(_qok){                    
                    let ErrData:any = [];//存放异常data
                    let iErrData = 0;//跑三次，还是同一个错误，就不用再入队列了。
                    //监听成功后，创建一个消费者。
                    return channel.consume(salf.QueueName,function(msg:any){   
                        //取消息列表中的数据，做逻辑处理。
                        try {
                            //测试异常重新入队。
                            if(JSON.parse(msg.content.toString()).USERNAME=="WAIT") var obj = JSON.parse(msg); 
                            // console.log(" = msgData = "+msg.content.toString()) ;
                            channel.ack(msg);//清队列。
                        } catch (error) {   
                           
                            //重新入队后，错误的msg写入log档，方便查看。
                            if(ErrData.indexOf(msg.content.toString()) ==-1){
                                salf.logger.error(error+ " = msgData = "+msg.content.toString()) ; //错误信息直接写到log档。
                                ErrData[iErrData] = msg.content.toString();
                                iErrData++;
                            }else{
                                channel.ack(msg);//清队列。错误信息重复出现，就清空队列，log档已经有记录错误。
                                console.log("error=="+msg.content.toString());
                                return ;
                            }    

                            channel.nack(msg); //出现异常，重新入队列。  
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