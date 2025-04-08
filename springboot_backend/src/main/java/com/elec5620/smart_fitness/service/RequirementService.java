package com.elec5620.smart_fitness.service;

import com.elec5620.smart_fitness.dto.RequirementDTO;
import com.elec5620.smart_fitness.model.Requirement;
import com.elec5620.smart_fitness.repository.RequirementRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Business logic for managing training requirements.
 */
@Service
public class RequirementService {

    private final RequirementRepository requirementRepository;

    @Autowired
    public RequirementService(RequirementRepository requirementRepository) {
        this.requirementRepository = requirementRepository;
    }

    // 添加新需求
    @Transactional
    public RequirementDTO addNewRequirement(Long traineeId, String traineeName, Long trainerId, String trainerName, double height, double weight) {
        Requirement requirement = new Requirement();
        requirement.setTraineeId(traineeId);
        requirement.setTraineeName(traineeName);
        requirement.setTrainerId(trainerId);
        requirement.setTrainerName(trainerName);
        requirement.setHeight(height);
        requirement.setWeight(weight);
        requirement.setIsResolved(false);  // 新添加的需求默认未解决
        requirement = requirementRepository.save(requirement);
        return new RequirementDTO(requirement);
    }

    // 更新训练需求的反馈
    @Transactional
    public void updateRequirementFeedback(Long id, String equipmentRecommendation, String trainingTimeRecommendation, int recommendedUsageCount) {
        Requirement requirement = requirementRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid requirement ID"));
        requirement.setEquipmentRecommendation(equipmentRecommendation);
        requirement.setTrainingTimeRecommendation(trainingTimeRecommendation);
        requirement.setRecommendedUsageCount(recommendedUsageCount);
        requirement.setIsResolved(true);  // 更新反馈后标记为已解决
        requirementRepository.save(requirement);
    }

    // 根据trainerId搜索所有未解决的需求
    public List<RequirementDTO> findUnresolvedRequirementsByTrainer(Long trainerId) {
        List<Requirement> requirements = requirementRepository.findByTrainerIdAndIsResolved(trainerId, false);
        return requirements.stream().map(RequirementDTO::new).collect(Collectors.toList());
    }

    // 根据traineeId搜索所有已解决的需求
    public List<RequirementDTO> findResolvedRequirementsByTrainee(Long traineeId) {
        List<Requirement> requirements = requirementRepository.findByTraineeIdAndIsResolved(traineeId, true);
        return requirements.stream().map(RequirementDTO::new).collect(Collectors.toList());
    }
}
