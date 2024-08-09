package com.example.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LOG_SEQ")
    @SequenceGenerator(name = "LOG_SEQ", sequenceName = "LOG_SEQ", allocationSize = 1)
    private Long log_id;
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

@Column(length = 2, nullable = false)
    private Integer taskNumber;

@Column(length = 2)
    private Integer currentTask;

@Column(nullable = false)
    private LocalDateTime timestamp;
@Column(length = 8192, nullable = false)
    private String code;
@Column
    private String errorMessage;

@Column
private Integer submitType;

@Column
private LocalDateTime sys_timestamp;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Long getLog_id() {
        return log_id;
    }

    public void setLog_id(Long log_id) {
        this.log_id = log_id;
    }

    public Integer getTaskNumber() {
        return taskNumber;
    }

    public void setTaskNumber(Integer taskNumber) {
        this.taskNumber = taskNumber;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Integer getSubmitType() {
        return submitType;
    }

    public void setSubmitType(Integer submitType) {
        this.submitType = submitType;
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
