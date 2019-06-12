import {ExpressDecrorators} from "../class/ExpressDecrorators";
import express from 'express';
import redis from 'redis';
import amqplib from 'amqplib';
import amqp from 'amqp';

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

                    //监听成功后，创建一个消费者。
                    return channel.consume(salf.QueueName,function(msg:any){  
                        
                        //取消息列表中的数据，做逻辑处理。
                        console.log('consume=='+ msg.content.toString());

                    },{noAck:true}); 
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