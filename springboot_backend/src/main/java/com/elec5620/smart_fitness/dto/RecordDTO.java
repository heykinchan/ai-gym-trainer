package com.elec5620.smart_fitness.dto;

import com.elec5620.smart_fitness.model.Record;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Data Transfer Object for Record.
 */
@Getter
@Setter
@NoArgsConstructor
public class RecordDTO {
    private Long id;
    private Long traineeId;
    private String traineeName;
    private String deviceId;
    private int usageDuration;
    private int usageCount;
    private String trainTime;
    private String globalTrainingId;
    public RecordDTO(Record recordEntity) {
        this.id = recordEntity.getId();
        this.traineeId = recordEntity.getTraineeId();
        this.traineeName = recordEntity.getTraineeName();
        this.deviceId = recordEntity.getDeviceId();
        this.usageDuration = recordEntity.getUsageDuration();
        this.usageCount = recordEntity.getUsageCount();
        this.trainTime = recordEntity.getTrainTime();
        this.globalTrainingId = recordEntity.getGlobalTrainingId();
    }
}
