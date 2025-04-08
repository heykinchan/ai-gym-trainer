package com.elec5620.smart_fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.elec5620.smart_fitness.model.Record;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findByTraineeId(Long traineeId);
}
