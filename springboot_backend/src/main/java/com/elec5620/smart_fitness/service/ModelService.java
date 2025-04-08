package com.elec5620.smart_fitness.service;

import java.io.File;
import java.io.IOException;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ModelService {

    private final String pythonServiceUrl = "http://localhost:8000/process_input";  // Python 服务地址

    public String callPythonModel(String inputText, String role) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = String.format("{\"content\": \"%s\"}", inputText);
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(pythonServiceUrl, request, String.class);
        return response.getBody();
    }
    
    //处理视频的，需要跟进
    public String sendVideoToPythonService(MultipartFile videoFile) {
    RestTemplate restTemplate = new RestTemplate();

    String url = "http://localhost:8000/process_input";

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    
    // 将 MultipartFile 保存为临时文件
    try {
        File tempFile = File.createTempFile("upload-", videoFile.getOriginalFilename());
        videoFile.transferTo(tempFile);
        body.add("video", new FileSystemResource(tempFile));
    } catch (IOException e) {
        e.printStackTrace();
        return "Error: Failed to create temporary file.";
    }

    HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

    ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
    return response.getBody();
}

    
    
}

