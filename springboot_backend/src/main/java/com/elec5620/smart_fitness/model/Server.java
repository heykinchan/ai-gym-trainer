package com.elec5620.smart_fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Entity object for server database table.
 */
@Getter
@NoArgsConstructor
@Entity
public class Server {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String serverId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private int port;

    @Column(nullable = false)
    private String version;

    @Column(nullable = false)
    private String updatePersonnelName;



    @Column
    private String updateReason;

    @Column(nullable = false)
    private String updatedFileName;

    public Server(String serverId, String name, String type, int port, String version, String updatePersonnelName,  String updateReason, String updatedFileName) {
        this.serverId = serverId;
        this.name = name;
        this.type = type;
        this.port = port;
        this.version = version;
        this.updatePersonnelName = updatePersonnelName;
        this.updateReason = updateReason;
        this.updatedFileName = updatedFileName;
    }


    public void setServerId(String serverId) {
        this.serverId = serverId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public void setUpdatePersonnelName(String updatePersonnelName) {
        this.updatePersonnelName = updatePersonnelName;
    }

    public void setUpdateReason(String updateReason) {
        this.updateReason = updateReason;
    }
}
