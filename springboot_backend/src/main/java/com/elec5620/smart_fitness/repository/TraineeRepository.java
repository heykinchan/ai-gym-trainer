package com.elec5620.smart_fitness.repository;

import com.elec5620.smart_fitness.model.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Data Access Object for user database table.
 */
public interface TraineeRepository extends JpaRepository<Trainee, Long> {
    Optional<Trainee> findByUsername(String username);
}
