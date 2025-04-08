package com.elec5620.smart_fitness.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.elec5620.smart_fitness.model.Record;
import com.elec5620.smart_fitness.repository.RecordRepository;
import com.elec5620.smart_fitness.dto.RecordDTO;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Date;

@Service
public class RecordService {

    @Autowired
    private RecordRepository recordRepository;

    @Transactional
    public RecordDTO saveRecord(Long traineeId, String traineeName, String deviceId, int usageDuration, int usageCount, String trainTime, String globalTrainingId) {
        // 实例化 Record 实体
        Record record = new Record(traineeId, traineeName, deviceId, usageDuration, usageCount, trainTime, globalTrainingId);
        
        // 保存记录到数据库
        record = recordRepository.save(record);
    
        // 返回保存后的记录DTO
        return new RecordDTO(record);
    }
    

    public List<RecordDTO> findAllRecordsByTraineeId(Long traineeId) {
        List<Record> records = recordRepository.findByTraineeId(traineeId);

        // 将所有Record实体转换为RecordDTO并返回
        return records.stream()
                .map(RecordDTO::new)  // 将每个Record实体转换为RecordDTO
                .collect(Collectors.toList());
    }
}
