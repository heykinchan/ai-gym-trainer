package com.elec5620.smart_fitness.controller;

import com.elec5620.smart_fitness.dto.RecordDTO;
import com.elec5620.smart_fitness.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/trainee/records")
public class RecordController {

    @Autowired
    private RecordService recordService;



    @PostMapping("/create")
    public ResponseEntity<?> createRecord(@RequestBody Map<String, Object> recordData) {
        try {

            Long traineeId = ((Number) recordData.get("traineeId")).longValue();
            String traineeName = (String) recordData.get("traineeName");
            String deviceId = String.valueOf(recordData.get("deviceName"));
            int usageDuration = (int)recordData.get("usageDuration");
            int usageCount = (int)recordData.get("usageCount");
            String trainTime = (String) recordData.get("trainTime");
            String globalTrainingId = String.valueOf(recordData.get("globalTrainingId"));




            RecordDTO newRecord = recordService.saveRecord(traineeId, traineeName, deviceId, usageDuration, usageCount, trainTime, globalTrainingId);


            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "New record created", "record", newRecord));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Error creating record: " + e.getMessage()));
        }
    }


    @GetMapping("/by-trainee/{traineeId}")
    public ResponseEntity<?> getRecordsByTraineeId(@PathVariable Long traineeId) {
        try {
            List<RecordDTO> records = recordService.findAllRecordsByTraineeId(traineeId);
            if (records.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "No records found for this trainee"));
            }
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Error retrieving records: " + e.getMessage()));
        }
    }
}
