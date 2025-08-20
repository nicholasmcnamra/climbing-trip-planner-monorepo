package com.example.climbing_trip_planner.spring_boot.Repositories;

import com.example.climbing_trip_planner.spring_boot.Entities.Climb;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ClimbRepository extends JpaRepository<Climb, UUID> {
    List<Climb> findByItineraryId(Long itineraryId);
}
