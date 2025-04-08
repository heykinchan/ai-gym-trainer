package com.elec5620.smart_fitness.dto;

import com.elec5620.smart_fitness.model.Equipment;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for Equipment.
 */
@RequiredArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EquipmentDTO {
    private Long id;
    private String name; 
    private String category;
    private int totalUsageTime;
    private LocalDateTime lastMaintenanceDate;
    private boolean isAvailable;

    public EquipmentDTO(Equipment equipmentEntity) {
        this.id = equipmentEntity.getId();
        this.name = equipmentEntity.getName();
        this.category = equipmentEntity.getCategory();
        this.totalUsageTime = equipmentEntity.getTotalUsageTime();
        this.lastMaintenanceDate = equipmentEntity.getLastMaintenanceDate();
        this.isAvailable = equipmentEntity.isAvailable();
    }
}
