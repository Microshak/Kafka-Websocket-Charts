package com.microsoft.iotlab.kafkaIoTLab.config;


import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter  {

//  @Bean
//  public InternalResourceViewResolver viewResolver() {
//    InternalResourceViewResolver resolver = new InternalResourceViewResolver();
//    resolver.setPrefix("/WEB-INF/pages/");
//    resolver.setSuffix(".jsp");
//    return resolver;
//  }
}
