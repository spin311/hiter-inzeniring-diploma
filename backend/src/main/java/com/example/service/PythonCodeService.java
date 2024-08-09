package com.example.service;

import com.example.dto.ChatDTO;
import com.example.dto.PythonLogRequestDTO;
import com.example.dto.SubmitDTO;
import com.example.dto.SubmitRequestDTO;
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
public class PythonCodeService {

    private final LogRepository logRepository;
    private final StudentRepository studentRepository;
    private final ChatRepository chatRepository;
    private final SubmitRepository submitRepository;

    @Autowired
    public PythonCodeService(LogRepository logRepository, StudentRepository studentRepository, ChatRepository chatRepository, SubmitRepository submitRepository) {
        this.logRepository = logRepository;
        this.studentRepository = studentRepository;
        this.chatRepository = chatRepository;
        this.submitRepository = submitRepository;
    }


    public String downloadCode(PythonLogRequestDTO pythonLogRequestDTO) {

        String pythonCode = pythonLogRequestDTO.getPythonCode();
        String guid = pythonLogRequestDTO.getId();
        String errorMessage = pythonLogRequestDTO.getErrorMessage();
        Integer taskNumber = pythonLogRequestDTO.getTaskNumber();
        Integer submitType = pythonLogRequestDTO.getAutoSubmitted() ? 0 : 1;
        try {
            Student student = studentRepository.findByGuid(guid);
            saveLog(pythonLogRequestDTO, student, submitType);
        } catch (Exception e) {
            e.printStackTrace();
            return String.format("Failed to save task %d with id %s and code %s: %s", taskNumber, guid, pythonCode, e.getMessage());
        }

            return String.format("Task %d with id %s, code %s and error message %s has been downloaded", taskNumber, guid, pythonCode,errorMessage);


    }

    public String submitCode(SubmitRequestDTO submitRequestDTO) {
        PythonLogRequestDTO pythonLogRequestDTO = submitRequestDTO.getPythonLogRequestDTO();
        String guid = pythonLogRequestDTO.getId();
        SubmitDTO submitDTO = submitRequestDTO.getSubmitDTO();
        Integer currentTask = pythonLogRequestDTO.getCurrentTask();
        List<ChatDTO> chatList = submitRequestDTO.getChatDTOList();
        try {
            Student student = studentRepository.findByGuid(guid);
            saveSubmit(student, submitDTO, currentTask);
            saveLog(pythonLogRequestDTO, student, 2);
            for (ChatDTO chatDTO : chatList) {
                saveChat(chatDTO, student, currentTask);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to submit code: " + e.getMessage();
        }
        return "Code submitted";
    }

    private void saveSubmit(Student student, SubmitDTO submitDTO, Integer currentTask) {
        Submit submit = new Submit();
        submit.setStudent(student);
        submit.setCorrectCount(submitDTO.getCorrectCount());
        submit.setTaskNumber(submitDTO.getTaskNumber());
        submit.setErrorCount(submitDTO.getErrorCount());
        submit.setSeconds(submitDTO.getSeconds());
        submit.setStartTime(submitDTO.getStartTime());
        submit.setEndTime(submitDTO.getEndTime());
        submit.setTotalQuestions(submitDTO.getTotalQuestions());
        submit.setCurrentTask(currentTask);
        submit.setSys_timestamp(TimezoneUtil.getUtcLocalDateTime());
        submitRepository.save(submit);

    }

    private void saveChat(ChatDTO chatDTO, Student student, Integer currentTask) {
        Chat chat = new Chat();
        chat.setStudent(student);
        chat.setChatQuestion(chatDTO.getChatQuestion());
        chat.setChatAnswer(chatDTO.getChatAnswer());
        chat.setChatNumber(chatDTO.getChatNumber());
        chat.setCodeNumber(chatDTO.getCodeNumber());
        chat.setCurrentTask(currentTask);
        chat.setTimestamp(chatDTO.getTimestamp());
        chatRepository.save(chat);
    }

    private void saveLog(PythonLogRequestDTO pythonLogRequestDTO, Student student, Integer submitType) {
        Log log = new Log();
        log.setCode(pythonLogRequestDTO.getPythonCode());
        log.setErrorMessage(pythonLogRequestDTO.getErrorMessage());
        log.setTaskNumber(pythonLogRequestDTO.getTaskNumber());
        log.setSys_timestamp(TimezoneUtil.getUtcLocalDateTime());
        log.setSubmitType(submitType);
        log.setCurrentTask(pythonLogRequestDTO.getCurrentTask());
        log.setTimestamp(pythonLogRequestDTO.getTimestamp());
        log.setStudent(student);
        logRepository.save(log);
    }


}
