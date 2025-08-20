package com.example.climbing_trip_planner.spring_boot.Repositories;

import com.example.climbing_trip_planner.spring_boot.Entities.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
}
