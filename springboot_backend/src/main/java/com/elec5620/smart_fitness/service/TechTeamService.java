package com.elec5620.smart_fitness.service;

import com.elec5620.smart_fitness.dto.TechTeamDTO;
import com.elec5620.smart_fitness.model.TechTeam;
import com.elec5620.smart_fitness.repository.TechTeamRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Business logic for user management.
 */
@Service
public class TechTeamService {
    private final TechTeamRepository userRepository;

    @Autowired
    public TechTeamService(TechTeamRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 创建用户
    @Transactional
    public TechTeamDTO createUser(String username, String password) {
        TechTeam user = new TechTeam(username, password);
        user = userRepository.save(user);
        return new TechTeamDTO(user);
    }

}
