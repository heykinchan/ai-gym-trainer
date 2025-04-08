package com.elec5620.smart_fitness.repository;

import com.elec5620.smart_fitness.model.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RequirementRepository extends JpaRepository<Requirement, Long> {

    List<Requirement> findByTrainerIdAndIsResolved(@Param("trainerId") Long trainerId, @Param("isResolved") boolean isResolved);

    List<Requirement> findByTraineeIdAndIsResolved(@Param("traineeId") Long traineeId, @Param("isResolved") boolean isResolved);

    @Transactional
    @Modifying
    @Query("UPDATE Requirement r SET r.equipmentRecommendation = :equipmentRecommendation, r.trainingTimeRecommendation = :trainingTimeRecommendation, r.recommendedUsageCount = :recommendedUsageCount, r.isResolved = :isResolved WHERE r.id = :id")
    void updateRequirementFeedback(@Param("id") Long id, @Param("equipmentRecommendation") String equipmentRecommendation, @Param("trainingTimeRecommendation") String trainingTimeRecommendation, @Param("recommendedUsageCount") int recommendedUsageCount, @Param("isResolved") boolean isResolved);
}
