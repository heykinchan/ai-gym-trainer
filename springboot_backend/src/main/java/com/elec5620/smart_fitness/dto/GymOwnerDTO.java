package com.elec5620.smart_fitness.dto;

import com.elec5620.smart_fitness.model.GymOwner;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object for Gym Owner.
 */
@RequiredArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GymOwnerDTO {
    private Long id;
    private String username;
    public GymOwnerDTO(GymOwner ownerEntity) {
        this.id = ownerEntity.getId();
        this.username = ownerEntity.getUsername();
    }
}
