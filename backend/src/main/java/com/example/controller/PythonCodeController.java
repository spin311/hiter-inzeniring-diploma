package com.example.controller;

import com.example.dto.PythonLogRequestDTO;
import com.example.dto.SubmitRequestDTO;
import com.example.service.PythonCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/python")
public class PythonCodeController {

    private final PythonCodeService pythonCodeService;

    @Autowired
    public PythonCodeController(PythonCodeService pythonCodeService) {
        this.pythonCodeService = pythonCodeService;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/log")
    public ResponseEntity<String> log(@RequestBody PythonLogRequestDTO pythonLogRequest) {
        try {
            String result =  pythonCodeService.downloadCode(pythonLogRequest);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to log Python code: " + e.getMessage());

        }
        //call PythonCodeService with code




    }

    @CrossOrigin(origins = "*")
    @PostMapping("/submit")
    public ResponseEntity<String> submit(@RequestBody SubmitRequestDTO submitRequestDTO) {
        try {
            String result = pythonCodeService.submitCode(submitRequestDTO);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to submit current task for request: " +  submitRequestDTO + e.getMessage());

        }
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);

    }
}
