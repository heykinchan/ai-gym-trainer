package com.elec5620.smart_fitness.service;

import com.elec5620.smart_fitness.dto.TrainerDTO;
import com.elec5620.smart_fitness.model.Trainer;
import com.elec5620.smart_fitness.repository.TrainerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Business logic for user management.
 */
@Service
public class TrainerService {
    private final TrainerRepository userRepository;

    @Autowired
    public TrainerService(TrainerRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 创建用户
    @Transactional
    public TrainerDTO createUser(String username, String password) {
        Trainer user = new Trainer(username, password);
        user = userRepository.save(user);
        return new TrainerDTO(user);
    }
    @Transactional
    public List<TrainerDTO> getAllTrainers() {
        List<Trainer> trainers = userRepository.findAll();
        return trainers.stream().map(TrainerDTO::new).collect(Collectors.toList());
    }

    

}
