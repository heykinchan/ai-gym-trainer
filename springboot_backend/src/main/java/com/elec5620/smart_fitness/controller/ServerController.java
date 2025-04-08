package com.elec5620.smart_fitness.controller;

import com.elec5620.smart_fitness.dto.ServerDTO;
import com.elec5620.smart_fitness.service.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.time.format.DateTimeFormatter;

@CrossOrigin
@RestController
@RequestMapping("/api/server")
public class ServerController {

    @Autowired
    private ServerService serverService;

    @GetMapping("/all-updates")
    public ResponseEntity<List<ServerDTO>> getAllUpdatesFromNow() {
        List<ServerDTO> allUpdates = serverService.getAllUpdatesFromNow();
        return ResponseEntity.ok(allUpdates);
    }

    @GetMapping("/latest-updates")
    public ResponseEntity<List<ServerDTO>> getLatestUpdatesByServerId() {
        List<ServerDTO> latestUpdates = serverService.getLatestUpdatesByServerId();
        return ResponseEntity.ok(latestUpdates);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewServer(@RequestBody Map<String, Object> serverData) {
        String serverId = (String) serverData.get("serverId");
        String name = (String) serverData.get("name");
        String type = (String) serverData.get("type");
        int port = (Integer) serverData.get("port");
        String version = (String) serverData.get("version");
        String updatePersonnelName = (String) serverData.get("updatePersonnelName");
        String updateReason = (String) serverData.get("updateReason");
        String updatedFileName = (String) serverData.get("updatedFileName");
        ServerDTO newServer = serverService.addNewServer(serverId, name, type, port, version, updatePersonnelName, updateReason, updatedFileName);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "New server added", "server", newServer));
    }
}
