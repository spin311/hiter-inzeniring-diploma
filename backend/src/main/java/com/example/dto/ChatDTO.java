package com.example.dto;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

public class ChatDTO {
    private String id;
    private Integer chatNumber;
    private Integer codeNumber;
    private String chatQuestion;
    private String chatAnswer;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime timestamp;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getChatNumber() {
        return chatNumber;
    }

    public void setChatNumber(Integer chatNumber) {
        this.chatNumber = chatNumber;
    }

    public Integer getCodeNumber() {
        return codeNumber;
    }

    public void setCodeNumber(Integer codeNumber) {
        this.codeNumber = codeNumber;
    }

    public String getChatQuestion() {
        return chatQuestion;
    }

    public void setChatQuestion(String chatQuestion) {
        this.chatQuestion = chatQuestion;
    }

    public String getChatAnswer() {
        return chatAnswer;
    }

    public void setChatAnswer(String chatAnswer) {
        this.chatAnswer = chatAnswer;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
