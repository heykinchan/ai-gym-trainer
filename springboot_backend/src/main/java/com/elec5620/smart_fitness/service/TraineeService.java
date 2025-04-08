package com.elec5620.smart_fitness.service;

import com.elec5620.smart_fitness.dto.TraineeDTO;
import com.elec5620.smart_fitness.model.Trainee;
import com.elec5620.smart_fitness.repository.TraineeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Business logic for user management.
 */
@Service
public class TraineeService {
    private final TraineeRepository userRepository;

    @Autowired
    public TraineeService(TraineeRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 创建用户
    @Transactional
    public TraineeDTO createUser(String username, String password) {
        Trainee user = new Trainee(username, password);
        user = userRepository.save(user);
        return new TraineeDTO(user);
    }

}
