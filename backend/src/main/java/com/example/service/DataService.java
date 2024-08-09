package com.example.service;

import com.example.entity.Chat;
import com.example.entity.Log;
import com.example.entity.Student;
import com.example.entity.Submit;
import com.example.repository.ChatRepository;
import com.example.repository.LogRepository;
import com.example.repository.StudentRepository;
import com.example.repository.SubmitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {
    
    private final ChatRepository chatRepository;
    private final LogRepository logRepository;
    private final StudentRepository studentRepository;
    private final SubmitRepository submitRepository;
    
    @Autowired
    public DataService(ChatRepository chatRepository, LogRepository logRepository, StudentRepository studentRepository, SubmitRepository submitRepository) {
        this.chatRepository = chatRepository;
        this.logRepository = logRepository;
        this.studentRepository = studentRepository;
        this.submitRepository = submitRepository;
    }


    public List<Log> getLog() {
        return logRepository.findAll();
    }

    public List<Student> getStudent() {
        return studentRepository.findAll();
    }

    public List<Submit> getSubmit() {
        return submitRepository.findAll();
    }

    public List<Chat> getChat() {
        return chatRepository.findAll();
    }
}
