package com.elec5620.smart_fitness.repository;

import com.elec5620.smart_fitness.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Data Access Object for user database table.
 */
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    Optional<Trainer> findByUsername(String username);
}
