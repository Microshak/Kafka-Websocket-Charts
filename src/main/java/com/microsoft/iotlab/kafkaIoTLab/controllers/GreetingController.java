package com.microsoft.iotlab.kafkaIoTLab.controllers;



import com.microsoft.iotlab.kafkaIoTLab.model.HelloMessage;
import com.microsoft.iotlab.kafkaIoTLab.model.Greeting;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.TopicPartition;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.util.HtmlUtils;

import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.util.regex.Pattern;

@EnableScheduling
@Controller
public class GreetingController {

    private int x;

    @Value("${kafka.ip}")
    private String ip;

/*
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {

        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }
*/

    @CrossOrigin(origins = "http://localhost:3000")
    @MessageMapping("/hello/{topic}")
    @SendTo("/topic/{topic}")
    public Greeting greeting2(@DestinationVariable String topic, HelloMessage message) throws Exception {


        return new Greeting("Hello, " + topic + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

    @Autowired
    private SimpMessagingTemplate template;

    @Scheduled(fixedRate = 10000)
    public void greeting() {
        //try {
           // Thread.sleep(1000); // simulated delay
        //}catch(InterruptedException e)
        //{ System.out.println("poop");}
        x++;

        String jsonString = new JSONObject()
                .put("content", "test!" +  Integer.toString(x)).toString();


        this.template.convertAndSend("/topic/Mike", jsonString);
    }


    @Scheduled(fixedRate = 1000)
    public void kafkaConsumer() {
        //try {
        // Thread.sleep(1000); // simulated delay
        //}catch(InterruptedException e)
        //{ System.out.println("poop");}

        Properties props = new Properties();
        props.put("bootstrap.servers", ip);
        props.put("group.id", "test");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("session.timeout.ms", "30000");
        props.put("key.deserializer","org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer","org.apache.kafka.common.serialization.StringDeserializer");

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
        Pattern r = Pattern.compile("^device.*");
        int x = 0;
        consumer.subscribe(r);
        try {
            while(x++ < 100) {
                ConsumerRecords<String, String> records = consumer.poll(Long.MAX_VALUE);
                for (TopicPartition partition : records.partitions()) {
                    List<ConsumerRecord<String, String>> partitionRecords = records.records(partition);
                    for (ConsumerRecord<String, String> record : partitionRecords) {


                        String jsonString = new JSONObject()
                                .put(record.key(), record.value()).toString();

                        String formattedJson = jsonString.replace("\\","");
                      //  System.out.println(Integer.toString(x) +" /topic/"+record.topic()   + ": "  +record.value());
                        this.template.convertAndSend("/topic/" + record.topic(),  record.value());


                    }
                    long lastOffset = partitionRecords.get(partitionRecords.size() - 1).offset();

                    consumer.commitSync(Collections.singletonMap(partition, new OffsetAndMetadata(lastOffset + 1)));
                }
            }
        } finally {
            consumer.close();
        }



    }


}
