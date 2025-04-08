package com.elec5620.smart_fitness.repository;

import com.elec5620.smart_fitness.model.TechTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Data Access Object for user database table.
 */
public interface TechTeamRepository extends JpaRepository<TechTeam, Long> {
    Optional<TechTeam> findByUsername(String username);
}
