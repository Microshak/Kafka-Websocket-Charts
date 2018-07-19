package com.microsoft.iotlab.kafkaIoTLab.controllers.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class HomeController {



    @RequestMapping("/device")
    public String device(Map<String, Object> model) {
        model.put("message", "You are in new page !!");
        return "device";
    }

/*

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public String home(){
        return "this is home page!!!";
    }
*/

}
