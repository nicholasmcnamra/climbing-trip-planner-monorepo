package com.example.climbing_trip_planner.spring_boot.Services;

import com.example.climbing_trip_planner.spring_boot.Controllers.ItineraryController;
import com.example.climbing_trip_planner.spring_boot.Entities.Climb;
import com.example.climbing_trip_planner.spring_boot.Entities.Itinerary;
import com.example.climbing_trip_planner.spring_boot.dto.ClimbInput;

import java.util.List;
import java.util.UUID;

public interface ItineraryService {
    Itinerary getById(Long id);
    List<Itinerary> getAll();
    Itinerary create(Itinerary itinerary);
    void delete(Long id);

    List<Climb> getClimbsByItinerary(Long itineraryId);
    Itinerary addClimbToItinerary(Long itineraryId, ClimbInput climbInput);
    Itinerary removeClimbFromItinerary(Long itineraryId, UUID climbId);
}
