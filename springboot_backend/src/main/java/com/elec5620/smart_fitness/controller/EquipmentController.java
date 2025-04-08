package com.elec5620.smart_fitness.controller;

import com.elec5620.smart_fitness.dto.EquipmentDTO;
import com.elec5620.smart_fitness.model.Equipment;
import com.elec5620.smart_fitness.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.time.format.DateTimeFormatter;

@CrossOrigin
@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;


    @GetMapping("/all")
    public ResponseEntity<List<EquipmentDTO>> getAllEquipment() {
        List<EquipmentDTO> allEquipment = equipmentService.getAllEquipment();
        return ResponseEntity.ok(allEquipment);
    }


    @PostMapping("/toggleAvailability")
    public ResponseEntity<?> toggleEquipmentAvailability(@RequestBody Map<String, Object> updateData) {
        Long equipmentId = ((Number) updateData.get("id")).longValue();
        System.out.println("Received data: " + updateData);
        

        Object isAvailableObj = updateData.get("isAvailable");
        boolean currentAvailability;

        if (isAvailableObj instanceof Boolean) {
            currentAvailability = (Boolean) isAvailableObj;
        } else if (isAvailableObj instanceof String) {
            currentAvailability = Boolean.parseBoolean((String) isAvailableObj);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Invalid availability data type"));
        }
        

        boolean newAvailability = !currentAvailability;
        equipmentService.updateEquipmentAvailability(equipmentId, newAvailability);

        return ResponseEntity.ok(Map.of("message", "Equipment availability updated", "isAvailable", newAvailability));
    }



    @PostMapping("/updateMaintenanceDate")
    public ResponseEntity<?> updateMaintenanceDate(@RequestBody Map<String, Object> updateData) {
        Long equipmentId = ((Number) updateData.get("id")).longValue();
        

        LocalDateTime maintenanceDate = LocalDateTime.now();
        

        equipmentService.updateLastMaintenanceDate(equipmentId, maintenanceDate);


        return ResponseEntity.ok(Map.of("message", "Last maintenance date updated", "lastMaintenanceDate", maintenanceDate));
    }


    @PostMapping("/updateUsageTime")
    public ResponseEntity<?> updateUsageTime(@RequestBody Map<String, Object> updateData) {
        Long equipmentId = ((Number) updateData.get("id")).longValue();
        int usageTime = (Integer) updateData.get("usageTime");
        equipmentService.updateUsageTime(equipmentId, usageTime);
        return ResponseEntity.ok(Map.of("message", "Usage time updated"));
    }


    @PostMapping("/add")
    public ResponseEntity<?> addNewEquipment(@RequestBody Map<String, Object> equipmentData) {
        String name = (String) equipmentData.get("name");
        String category = (String) equipmentData.get("category");
        int totalUsageTime = (int) equipmentData.get("totalUsageTime");
        boolean isAvailable = (Boolean) equipmentData.get("isAvailable");
        String lastMaintenanceDateStr = (String) equipmentData.get("lastMaintenanceDate");
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        LocalDateTime lastMaintenanceDate = LocalDateTime.parse(lastMaintenanceDateStr, formatter);

        
        EquipmentDTO newEquipment = equipmentService.addNewEquipment(name,category, totalUsageTime, lastMaintenanceDate, isAvailable);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "New equipment added", "equipment", newEquipment));
    }
}
