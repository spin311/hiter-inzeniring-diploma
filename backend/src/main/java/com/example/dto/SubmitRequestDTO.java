package com.example.dto;

import java.util.List;
public class SubmitRequestDTO {
    private List<ChatDTO> chatDTOList;

    private PythonLogRequestDTO pythonLogRequestDTO;

    private SubmitDTO submitDTO;

    public List<ChatDTO> getChatDTOList() {
        return chatDTOList;
    }

    public void setChatDTOList(List<ChatDTO> chatDTOList) {
        this.chatDTOList = chatDTOList;
    }

    public PythonLogRequestDTO getPythonLogRequestDTO() {
        return pythonLogRequestDTO;
    }

    public void setPythonLogRequestDTO(PythonLogRequestDTO pythonLogRequestDTO) {
        this.pythonLogRequestDTO = pythonLogRequestDTO;
    }

    public SubmitDTO getSubmitDTO() {
        return submitDTO;
    }

    public void setSubmitDTO(SubmitDTO submitDTO) {
        this.submitDTO = submitDTO;
    }
}
