package com.elec5620.smart_fitness.dto;

import com.elec5620.smart_fitness.model.Server;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object for Server.
 */
@RequiredArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServerDTO {
    private Long id;
    private String serverId;
    private String name;
    private String type;
    private int port;
    private String version;
    private String updatePersonnelName;
    private String updateReason;
    private String updatedFileName;
    public ServerDTO(Server serverEntity) {
        this.id = serverEntity.getId();
        this.serverId = serverEntity.getServerId();
        this.name = serverEntity.getName();
        this.type = serverEntity.getType();
        this.port = serverEntity.getPort();
        this.version = serverEntity.getVersion();
        this.updatePersonnelName = serverEntity.getUpdatePersonnelName();
        this.updateReason = serverEntity.getUpdateReason();
        this.updatedFileName = serverEntity.getUpdatedFileName();
    }
}
