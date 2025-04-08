package com.elec5620.smart_fitness.service;

import com.elec5620.smart_fitness.dto.EquipmentDTO;
import com.elec5620.smart_fitness.model.Equipment;
import com.elec5620.smart_fitness.repository.EquipmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Business logic for equipment management.
 */
@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;

    @Autowired
    public EquipmentService(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    // 获取所有器械
    public List<EquipmentDTO> getAllEquipment() {
        List<Equipment> equipmentList = equipmentRepository.findAll();
        return equipmentList.stream().map(EquipmentDTO::new).collect(Collectors.toList());
    }

    // 添加新器械
    @Transactional
    public EquipmentDTO addNewEquipment(String name, String category, int totalUsageTime, LocalDateTime lastMaintenanceDate, boolean isAvailable) {
        Equipment equipment = new Equipment(name, category, totalUsageTime, lastMaintenanceDate, isAvailable);
        equipment = equipmentRepository.save(equipment);
        return new EquipmentDTO(equipment);
    }

    // 更新器械的可用性
    @Transactional
    public void updateEquipmentAvailability(Long id, boolean isAvailable) {
        equipmentRepository.updateAvailability(id, isAvailable);
    }

    // 更新器械的最近维护日期
    @Transactional
    public void updateLastMaintenanceDate(Long id, LocalDateTime lastMaintenanceDate) {
        equipmentRepository.updateLastMaintenanceDate(id, lastMaintenanceDate);
    }

    // 更新器械的总使用时长
    @Transactional
    public void updateUsageTime(Long id, int usageTime) {
        Equipment equipment = equipmentRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid equipment ID"));
        equipment.setTotalUsageTime(usageTime);
        equipmentRepository.save(equipment);  // 更新使用时长后保存
    }
}
