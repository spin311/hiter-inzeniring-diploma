package com.example.service;

import com.example.entity.Student;
import com.example.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public String getStudentId() {
        String guid = generateGuid();
        boolean studentSaved = saveStudent(guid);
        if (!studentSaved) {
            return null;
        }
        return guid;
    }

    private String generateGuid() {
        return UUID.randomUUID().toString();
    }

    private boolean saveStudent(String guid) {
        try {
            Student student = new Student();
            student.setGuid(guid);
            student.setSys_timestamp(LocalDateTime.now());
            studentRepository.save(student);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

}
