package com.elec5620.smart_fitness.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import com.elec5620.smart_fitness.repository.TraineeRepository;
import com.elec5620.smart_fitness.service.TraineeService;
import com.elec5620.smart_fitness.dto.TraineeDTO;
import com.elec5620.smart_fitness.model.Trainee;
import java.util.Map;
import java.util.Optional;
/**
 * Interface
 */
@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/api/trainee")
public class TraineeController {

    @Autowired
    private TraineeRepository userRepository;
    @Autowired
    private TraineeService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<Trainee> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            Long id = user.get().getId();
            String returnedUsername = user.get().getUsername();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "traineeId", id,
                "traineeName", returnedUsername
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }
    // @PostMapping("/processText")
    // public ResponseEntity<String> processText(@RequestBody String text) {
    //     String response = modelService.callPythonModel(text, "trainee");
    //     return ResponseEntity.ok(response);
    // }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registrationData) {
        String username = registrationData.get("username");
        String password = registrationData.get("password");
        TraineeDTO newUser = userService.createUser(username, password);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Registration successful", "user", newUser));
    }


}