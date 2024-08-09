package com.example.controller;

import com.example.service.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/openai")
public class OpenAiController {

    private final OpenAiService openAiService;

    @Autowired
    public OpenAiController(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/getOpenAiChat")
    public String getOpenAiChat(@RequestBody String chatInput) {
        return openAiService.getOpenAiChat(chatInput);
    }
}
