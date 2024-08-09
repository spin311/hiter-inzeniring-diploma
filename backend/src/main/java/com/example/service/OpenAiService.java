package com.example.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class OpenAiService {

    public static final Integer MAX_TOKENS = 50;

    public String getOpenAiChat(String chatInput) {

        try{
            HttpURLConnection conn = getHttpConnectionForOpenAi(chatInput);

            int responseCode = conn.getResponseCode();
            if (responseCode != 200) {
                try (BufferedReader in = new BufferedReader(new InputStreamReader(conn.getErrorStream()))) {
                    String inputLine;
                    StringBuilder response = new StringBuilder();

                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);
                    }
                    return extractMessageFromJSONResponse(response.toString());
                }
            }
            // Read response
            try (BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                return extractMessageFromJSONResponse(response.toString());
            }

        }
        catch(Exception e){
            e.printStackTrace();
            return "Failed to get chat from OpenAI";
        }
    }

    private static HttpURLConnection getHttpConnectionForOpenAi(String chatInput) throws IOException {
        String apiKey = getApiKey();
        URL url = new URL("https://api.openai.com/v1/chat/completions");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "Bearer " + apiKey);
        conn.setDoOutput(true);

        // The request body
        JSONObject message = new JSONObject();
        message.put("role", "user");
        message.put("content", chatInput);

        JSONArray messages = new JSONArray();
        messages.put(message);

        JSONObject body = new JSONObject();
        body.put("model", "gpt-3.5-turbo-0125");
        body.put("messages", messages);
        body.put("max_tokens", MAX_TOKENS);

        try(OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream())) {
            writer.write(body.toString());
            writer.flush();
        }
        return conn;
    }

    public static String extractMessageFromJSONResponse(String response) {
        JSONObject jsonResponse = new JSONObject(response);
        JSONArray choices = jsonResponse.getJSONArray("choices");
        JSONObject firstChoice = choices.getJSONObject(0);
        JSONObject message = firstChoice.getJSONObject("message");
        return message.getString("content");

    }

    private static String getApiKey() {
        try {
        Dotenv dotenv = Dotenv.load();
        return dotenv.get("OPENAI_API_KEY");

        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
