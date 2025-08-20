package com.example.climbing_trip_planner.spring_boot.Services.impl;

import com.example.climbing_trip_planner.spring_boot.Entities.Area;
import com.example.climbing_trip_planner.spring_boot.Entities.Crag;
import com.example.climbing_trip_planner.spring_boot.Repositories.CragRepository;
import com.example.climbing_trip_planner.spring_boot.Services.CragService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CragServiceImpl implements CragService {

    private final CragRepository cragRepository;

    @Override
    public Crag getById(UUID id) {
        return cragRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Crag not found: " + id));
    }
    @Override
    public List<Crag> getAll() {
        return cragRepository.findAll();
    }
    @Override
    public Crag save(Crag entity) {
        return cragRepository.save(entity);
    }
    @Override
    public void deleteById(UUID id) {
        cragRepository.deleteById(id);
    }
    @Override
    public List<Crag> findByArea(Area area) {
        return cragRepository.findByArea(area);
    }
}
