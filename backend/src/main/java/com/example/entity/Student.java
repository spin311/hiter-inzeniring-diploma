package com.example.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STUDENT_SEQ")
    @SequenceGenerator(name = "STUDENT_SEQ", sequenceName = "STUDENT_SEQ", allocationSize = 1)
    private Long student_id;

    @Column(length = 36, nullable = false, unique = true)
    private String guid;

    @Column
    private LocalDateTime sys_timestamp;

    public Long getStudent_id() {
        return student_id;
    }

    public void setStudent_id(Long student_id) {
        this.student_id = student_id;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public LocalDateTime getSys_timestamp() {
        return sys_timestamp;
    }

    public void setSys_timestamp(LocalDateTime sys_timestamp) {
        this.sys_timestamp = sys_timestamp;
    }
}
