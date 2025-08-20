package com.example.climbing_trip_planner.spring_boot.Repositories;

import com.example.climbing_trip_planner.spring_boot.Entities.Area;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AreaRepository extends JpaRepository<Area, UUID> {
}
