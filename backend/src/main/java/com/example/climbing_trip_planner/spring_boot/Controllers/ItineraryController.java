package com.example.climbing_trip_planner.spring_boot.Controllers;

import com.example.climbing_trip_planner.spring_boot.Entities.Climb;
import com.example.climbing_trip_planner.spring_boot.Entities.Itinerary;
import com.example.climbing_trip_planner.spring_boot.Services.ItineraryService;
import com.example.climbing_trip_planner.spring_boot.dto.ClimbInput;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class ItineraryController {
    private final ItineraryService itineraryService;

    @QueryMapping
    public List<Itinerary> itineraries() {
        return itineraryService.getAll();
    }

    @QueryMapping
    public Itinerary itinerary(@Argument Long id) {
        return itineraryService.getById(id);
    }

    @QueryMapping
    public List<Climb> climbsByItinerary(@Argument Long itineraryId) {
        return itineraryService.getClimbsByItinerary(itineraryId);
    }

    @MutationMapping
    public Itinerary createItinerary(@Argument String name) {
        Itinerary itinerary = new Itinerary();
        itinerary.setName(name);
        return itineraryService.create(itinerary);
    }

    @MutationMapping
    public Boolean deleteItinerary(@Argument Long id) {
        itineraryService.delete(id);
        return true;
    }

    @MutationMapping
    public Itinerary addClimbToItinerary(
            @Argument Long itineraryId,
            @Argument("climb") ClimbInput climbInput
    ) {
        return itineraryService.addClimbToItinerary(itineraryId, climbInput);
    }

    @MutationMapping
    public Itinerary removeClimbFromItinerary(
            @Argument Long itineraryId,
            @Argument UUID climbId
    ) {
        return itineraryService.removeClimbFromItinerary(itineraryId, climbId);
    }
}
