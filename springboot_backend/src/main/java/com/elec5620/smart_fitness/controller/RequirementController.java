package com.elec5620.smart_fitness.controller;

import com.elec5620.smart_fitness.dto.RequirementDTO;
import com.elec5620.smart_fitness.service.RequirementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/requirement")
public class RequirementController {

    @Autowired
    private RequirementService requirementService;


    @PostMapping("/add")
    public ResponseEntity<?> addNewRequirement(@RequestBody Map<String, Object> requirementData) {
        Long traineeId = ((Number) requirementData.get("traineeId")).longValue();
        String traineeName = (String) requirementData.get("traineeName");
        Long trainerId = ((Number) requirementData.get("trainerId")).longValue();
        String trainerName = (String) requirementData.get("trainerName");
        Object heightObject = requirementData.get("height");
        double height = 0;
        if (heightObject != null) {
            try {
                height = Double.parseDouble(heightObject.toString());
            } catch (NumberFormatException e) {
                System.err.println("Invalid format for height: " + heightObject);
            }
        }
        Object weightObject = requirementData.get("weight");
        double weight = 0;
        if (weightObject != null) {
            try {
                weight = Double.parseDouble(weightObject.toString());
            } catch (NumberFormatException e) {
                System.err.println("Invalid format for weight: " + weightObject);
            }
        }

        RequirementDTO newRequirement = requirementService.addNewRequirement(traineeId, traineeName, trainerId, trainerName, height, weight);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "New requirement added", "requirement", newRequirement));
    }

    @PostMapping("/updateFeedback")
    public ResponseEntity<?> updateRequirementFeedback(@RequestBody Map<String, Object> feedbackData) {
        Long id = ((Number) feedbackData.get("id")).longValue();
        String equipmentRecommendation = (String) feedbackData.get("equipmentRecommendation");
        String trainingTimeRecommendation = (String) feedbackData.get("trainingTimeRecommendation");
        int recommendedUsageCount = (Integer) feedbackData.get("recommendedUsageCount");

        requirementService.updateRequirementFeedback(id, equipmentRecommendation, trainingTimeRecommendation, recommendedUsageCount);
        return ResponseEntity.ok(Map.of("message", "Requirement feedback updated", "id", id));
    }


    @GetMapping("/unresolved")
    public ResponseEntity<List<RequirementDTO>> getUnresolvedRequirementsByTrainer(@RequestParam Long trainerId) {
        List<RequirementDTO> unresolvedRequirements = requirementService.findUnresolvedRequirementsByTrainer(trainerId);
        return ResponseEntity.ok(unresolvedRequirements);
    }

    @PostMapping("/resolved")
    public ResponseEntity<List<RequirementDTO>> postResolvedRequirementsByTrainee(@RequestBody Map<String, Object> data) {
        Long traineeId = ((Number) data.get("traineeId")).longValue();
        List<RequirementDTO> resolvedRequirements = requirementService.findResolvedRequirementsByTrainee(traineeId);
        return ResponseEntity.ok(resolvedRequirements);
    }
}
