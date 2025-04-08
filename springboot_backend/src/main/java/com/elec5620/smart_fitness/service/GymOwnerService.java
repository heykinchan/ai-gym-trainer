package com.elec5620.smart_fitness.service;

import com.elec5620.smart_fitness.dto.GymOwnerDTO;
import com.elec5620.smart_fitness.model.GymOwner;
import com.elec5620.smart_fitness.repository.GymOwnerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Business logic for gym owner management.
 */
@Service
public class GymOwnerService {
    private final GymOwnerRepository gymOwnerRepository;

    @Autowired
    public GymOwnerService(GymOwnerRepository gymOwnerRepository) {
        this.gymOwnerRepository = gymOwnerRepository;
    }

    // 创建健身房主人
    @Transactional
    public GymOwnerDTO createGymOwner(String username, String password) {
        GymOwner owner = new GymOwner(username, password);
        owner = gymOwnerRepository.save(owner);
        return new GymOwnerDTO(owner);
    }
}
