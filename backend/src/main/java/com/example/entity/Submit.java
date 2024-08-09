package com.example.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
public class Submit {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SUBMIT_SEQ")
    @SequenceGenerator(name = "SUBMIT_SEQ", sequenceName = "SUBMIT_SEQ", allocationSize = 1)
    private Long submit_id;
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(length = 2, nullable = false)
    private Integer taskNumber;
@Column(nullable = false)
    private Integer seconds;
    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;
    @Column(nullable = false)
    private Integer errorCount;

    @Column(nullable = false)
    private Integer correctCount;

    @Column(nullable = false)
    private Integer totalQuestions;

    @Column(length = 2)
    private Integer currentTask;

    @Column
    private LocalDateTime sys_timestamp;

    public Long getSubmit_id() {
        return submit_id;
    }

    public void setSubmit_id(Long submit_id) {
        this.submit_id = submit_id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Integer getSeconds() {
        return seconds;
    }

    public void setSeconds(Integer seconds) {
        this.seconds = seconds;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Integer getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(Integer errorCount) {
        this.errorCount = errorCount;
    }

    public Integer getCorrectCount() {
        return correctCount;
    }

    public void setCorrectCount(Integer correctCount) {
        this.correctCount = correctCount;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Integer getTaskNumber() {
        return taskNumber;
    }

    public void setTaskNumber(Integer taskNumber) {
        this.taskNumber = taskNumber;
    }

    public LocalDateTime getSys_timestamp() {
        return sys_timestamp;
    }

    public void setSys_timestamp(LocalDateTime sys_timestamp) {
        this.sys_timestamp = sys_timestamp;
    }

    public Integer getCurrentTask() {
        return currentTask;
    }

    public void setCurrentTask(Integer currentTask) {
        this.currentTask = currentTask;
    }
}
