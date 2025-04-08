package com.elec5620.smart_fitness.dto;

import com.elec5620.smart_fitness.model.Trainer;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object for User.
 */
@RequiredArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TrainerDTO {
    private Long id;
    private String username;

    public TrainerDTO(Trainer userEntity) {
        this.id = userEntity.getId();
        this.username = userEntity.getUsername();
    }
}
