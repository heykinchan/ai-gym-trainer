package com.elec5620.smart_fitness.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import com.elec5620.smart_fitness.repository.TechTeamRepository;
import com.elec5620.smart_fitness.service.TechTeamService;
import com.elec5620.smart_fitness.dto.TechTeamDTO;
import com.elec5620.smart_fitness.model.TechTeam;

import java.util.Map;
import java.util.Optional;
/**
 * Interface
 */
@CrossOrigin
@RestController
@RequestMapping("/api/techteam")
public class TechTeamController {

    @Autowired
    private TechTeamRepository userRepository;
    @Autowired
    private TechTeamService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<TechTeam> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Login successful"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registrationData) {
        String username = registrationData.get("username");
        String password = registrationData.get("password");
        TechTeamDTO newUser = userService.createUser(username, password);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Registration successful", "user", newUser));
    }


}