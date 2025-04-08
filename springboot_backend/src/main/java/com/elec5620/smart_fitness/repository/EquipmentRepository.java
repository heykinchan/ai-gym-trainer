package com.elec5620.smart_fitness.repository;

import com.elec5620.smart_fitness.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    List<Equipment> findByIsAvailableTrue();

    @Transactional
    @Modifying
    @Query("UPDATE Equipment e SET e.isAvailable = :isAvailable WHERE e.id = :id")
    void updateAvailability(@Param("id") Long id, @Param("isAvailable") boolean isAvailable);

    @Transactional
    @Modifying
    @Query("UPDATE Equipment e SET e.totalUsageTime = :totalUsageTime WHERE e.id = :id")
    void updateUsageTime(@Param("id") Long id, @Param("totalUsageTime") int totalUsageTime);

    @Transactional
    @Modifying
    @Query("UPDATE Equipment e SET e.lastMaintenanceDate = :lastMaintenanceDate WHERE e.id = :id")
    void updateLastMaintenanceDate(@Param("id") Long id, @Param("lastMaintenanceDate") LocalDateTime lastMaintenanceDate);
}
