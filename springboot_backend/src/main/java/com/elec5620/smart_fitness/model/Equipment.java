package com.elec5620.smart_fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity object for equipment database table.
 */
@Getter
@NoArgsConstructor
@Entity
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    private int version;

    @Column(nullable = false)
    private String name;  

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private int totalUsageTime;

    @Column
    private LocalDateTime lastMaintenanceDate;

    @Column(nullable = false)
    private boolean isAvailable;

    public Equipment(String name,String category, int totalUsageTime, LocalDateTime lastMaintenanceDate, boolean isAvailable) {
        this.name = name;
        this.category = category;
        this.totalUsageTime = totalUsageTime;
        this.lastMaintenanceDate = lastMaintenanceDate;
        this.isAvailable = isAvailable;
    }

    public void setTotalUsageTime(int totalUsageTime) {
        this.totalUsageTime = totalUsageTime;
    }

    public void setLastMaintenanceDate(LocalDateTime lastMaintenanceDate) {
        this.lastMaintenanceDate = lastMaintenanceDate;
    }

    public void setIsAvailable(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }
}
