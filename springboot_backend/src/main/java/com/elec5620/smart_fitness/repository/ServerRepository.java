package com.elec5620.smart_fitness.repository;

import com.elec5620.smart_fitness.model.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface ServerRepository extends JpaRepository<Server, Long> {

    @Query("SELECT s FROM Server s  ORDER BY s.version ASC")
    List<Server> findAllUpdatesFromNow();

    @Query("SELECT s FROM Server s WHERE s.version = (SELECT MAX(s2.version) FROM Server s2 WHERE s2.serverId = s.serverId)ORDER BY s.serverId ASC")
    List<Server> findLatestUpdateByServerId();

    @Transactional
    @Modifying
    @Query("INSERT INTO Server (serverId, name, type, port, version, updatePersonnelName,  updateReason) " +
           "VALUES (:serverId, :name, :type, :port, :version, :updatePersonnelName, :updateReason)")
    void addNewServer(@Param("serverId") String serverId, 
                      @Param("name") String name, 
                      @Param("type") String type, 
                      @Param("port") int port, 
                      @Param("version") String version, 
                      @Param("updatePersonnelName") String updatePersonnelName, 
                      @Param("updateReason") String updateReason);
}
