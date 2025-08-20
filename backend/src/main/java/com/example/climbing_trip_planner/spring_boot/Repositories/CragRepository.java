package com.example.climbing_trip_planner.spring_boot.Repositories;

import com.example.climbing_trip_planner.spring_boot.Entities.Area;
import com.example.climbing_trip_planner.spring_boot.Entities.Crag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CragRepository extends JpaRepository<Crag, UUID> {
    List<Crag> findByArea(Area area);
    Optional<Crag> findByUuid(UUID uuid);
}
