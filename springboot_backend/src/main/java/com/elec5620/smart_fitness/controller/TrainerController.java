package com.elec5620.smart_fitness.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import com.elec5620.smart_fitness.repository.TrainerRepository;
import com.elec5620.smart_fitness.service.TrainerService;
import com.elec5620.smart_fitness.dto.TrainerDTO;
import com.elec5620.smart_fitness.model.Trainee;
import com.elec5620.smart_fitness.model.Trainer;
import java.util.Map;
import java.util.Optional;
import java.util.List;
/**
 * Interface
 */
@CrossOrigin
@RestController
@RequestMapping("/api/trainer")
public class TrainerController {

    @Autowired
    private TrainerRepository userRepository;
    @Autowired
    private TrainerService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<Trainer> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            Long id = user.get().getId();
            String returnedUsername = user.get().getUsername();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "trainerId", id,
                "trainerName", returnedUsername
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registrationData) {
        String username = registrationData.get("username");
        String password = registrationData.get("password");
        TrainerDTO newUser = userService.createUser(username, password);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Registration successful", "user", newUser));
    }

    @GetMapping("/all")
    public ResponseEntity<List<TrainerDTO>> getAllTrainers() {
        List<TrainerDTO> trainers = userService.getAllTrainers();
        if (trainers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(trainers);
        }
        return ResponseEntity.ok(trainers);
    }



}