package com.elec5620.smart_fitness.repository;

import com.elec5620.smart_fitness.model.GymOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Data Access Object for gym owner database table.
 */
public interface GymOwnerRepository extends JpaRepository<GymOwner, Long> {
    Optional<GymOwner> findByUsername(String username);
}
