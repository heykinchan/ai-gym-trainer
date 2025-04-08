package com.elec5620.smart_fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity object for storing training requirements and trainer recommendations.
 */
@Getter
@Setter 
@NoArgsConstructor
@Entity
public class Requirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long traineeId;

    @Column(nullable = false, length = 100)
    private String traineeName;

    @Column(nullable = false)
    private Long trainerId;

    @Column(nullable = false, length = 100)
    private String trainerName;

    @Column(nullable = false)
    private double height;

    @Column(nullable = false)
    private double weight;

    @Column(length = 200)
    private String equipmentRecommendation;

    @Column(length = 100)
    private String trainingTimeRecommendation;

    @Column
    private int recommendedUsageCount;

    @Column(nullable = false)
    private boolean isResolved;

    public Requirement(Long traineeId, String traineeName, Long trainerId, String trainerName, double height, double weight, String equipmentRecommendation, String trainingTimeRecommendation, int recommendedUsageCount, boolean isResolved) {
        this.traineeId = traineeId;
        this.traineeName = traineeName;
        this.trainerId = trainerId;
        this.trainerName = trainerName;
        this.height = height;
        this.weight = weight;
        this.equipmentRecommendation = equipmentRecommendation;
        this.trainingTimeRecommendation = trainingTimeRecommendation;
        this.recommendedUsageCount = recommendedUsageCount;
        this.isResolved = isResolved;
    }

    public void setIsResolved(boolean isResolved) {
        this.isResolved = isResolved;
    }
}
