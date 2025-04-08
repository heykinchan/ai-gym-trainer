package com.elec5620.smart_fitness.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import com.elec5620.smart_fitness.repository.GymOwnerRepository;
import com.elec5620.smart_fitness.service.GymOwnerService;
import com.elec5620.smart_fitness.dto.GymOwnerDTO;
import com.elec5620.smart_fitness.model.GymOwner;
import java.util.Map;
import java.util.Optional;

/**
 * Interface for gym owner-related operations
 */
@CrossOrigin
@RestController
@RequestMapping("/api/gymOwner")
public class GymOwnerController {

    @Autowired
    private GymOwnerRepository gymOwnerRepository;
    @Autowired
    private GymOwnerService gymOwnerService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<GymOwner> owner = gymOwnerRepository.findByUsername(username);
        if (owner.isPresent() && owner.get().getPassword().equals(password)) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Login successful"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registrationData) {
        String username = registrationData.get("username");
        String password = registrationData.get("password");

        GymOwnerDTO newOwner = gymOwnerService.createGymOwner(username, password);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Registration successful", "owner", newOwner));
    }
}
