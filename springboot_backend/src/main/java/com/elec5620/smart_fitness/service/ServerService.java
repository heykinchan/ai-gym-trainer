package com.elec5620.smart_fitness.service;

import com.elec5620.smart_fitness.dto.ServerDTO;
import com.elec5620.smart_fitness.model.Server;
import com.elec5620.smart_fitness.repository.ServerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Business logic for server management.
 */
@Service
public class ServerService {

    private final ServerRepository serverRepository;

    @Autowired
    public ServerService(ServerRepository serverRepository) {
        this.serverRepository = serverRepository;
    }

    // 获取所有服务器更新记录，按时间顺序从现在到将来排列
    public List<ServerDTO> getAllUpdatesFromNow() {
        List<Server> serverList = serverRepository.findAllUpdatesFromNow();
        return serverList.stream().map(ServerDTO::new).collect(Collectors.toList());
    }

    // 根据服务器ID获取最新的更新时间记录
    public List<ServerDTO> getLatestUpdatesByServerId() {
        List<Server> latestUpdates = serverRepository.findLatestUpdateByServerId();
        return latestUpdates.stream().map(ServerDTO::new).collect(Collectors.toList());
    }

    // 添加新服务器记录
    @Transactional
    public ServerDTO addNewServer(String serverId, String name, String type, int port, String version, String updatePersonnelName,  String updateReason, String updatedFileName) {
        Server server = new Server(serverId, name, type, port, version, updatePersonnelName,  updateReason, updatedFileName);
        server = serverRepository.save(server);
        return new ServerDTO(server);
    }

    
}
