package com.elec5620.smart_fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Entity object for Record table.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long traineeId;

    @Column(nullable = false)
    private String traineeName;

    @Column(nullable = false)
    private String deviceId;

    @Column(nullable = false)
    private int usageDuration;

    @Column(nullable = false)
    private int usageCount;

    @Column(nullable = false)
    private String trainTime;

    @Column(nullable = false)
    private String globalTrainingId; 


    public Record(Long traineeId, String traineeName, String deviceId, int usageDuration, int usageCount, String trainTime, String globalTrainingId ) {
        this.traineeId = traineeId;
        this.traineeName = traineeName;
        this.deviceId = deviceId;
        this.usageDuration = usageDuration;
        this.usageCount = usageCount;
        this.trainTime = trainTime;
        this.globalTrainingId=globalTrainingId;
    }
}
