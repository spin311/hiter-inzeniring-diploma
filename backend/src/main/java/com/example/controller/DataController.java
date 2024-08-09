package com.example.controller;

import com.example.entity.Chat;
import com.example.entity.Log;
import com.example.entity.Student;
import com.example.entity.Submit;
import com.example.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/data")
public class DataController {

    private final DataService dataService;
    @Autowired
    public DataController(DataService dataService) {
        this.dataService = dataService;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/chat")
    public List<Chat> getChat() {
        return dataService.getChat();
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/log")
    public List<Log> getLog() {
        return dataService.getLog();
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/student")
    public List<Student> getStudent() {
        return dataService.getStudent();
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/submit")
    public List<Submit> getSubmit() {
        return dataService.getSubmit();
    }

}
