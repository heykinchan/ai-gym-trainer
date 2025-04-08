package com.elec5620.smart_fitness.dto;

import com.elec5620.smart_fitness.model.Requirement;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object for Requirement.
 */
@RequiredArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequirementDTO {
    private Long id;
    private Long traineeId;
    private String traineeName;
    private Long trainerId;
    private String trainerName;
    private double height;
    private double weight;
    private String equipmentRecommendation;
    private String trainingTimeRecommendation;
    private int recommendedUsageCount;
    private boolean isResolved;
    public RequirementDTO(Requirement requirementEntity) {
        this.id = requirementEntity.getId();
        this.traineeId = requirementEntity.getTraineeId();
        this.traineeName = requirementEntity.getTraineeName();
        this.trainerId = requirementEntity.getTrainerId();
        this.trainerName = requirementEntity.getTrainerName();
        this.height = requirementEntity.getHeight();
        this.weight = requirementEntity.getWeight();
        this.equipmentRecommendation = requirementEntity.getEquipmentRecommendation();
        this.trainingTimeRecommendation = requirementEntity.getTrainingTimeRecommendation();
        this.recommendedUsageCount = requirementEntity.getRecommendedUsageCount();
        this.isResolved = requirementEntity.isResolved();
    }
}
