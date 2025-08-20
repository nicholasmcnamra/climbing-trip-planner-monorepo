package com.example.climbing_trip_planner.spring_boot.Services.impl;

import com.example.climbing_trip_planner.spring_boot.Controllers.ItineraryController;
import com.example.climbing_trip_planner.spring_boot.Entities.Climb;
import com.example.climbing_trip_planner.spring_boot.Entities.Crag;
import com.example.climbing_trip_planner.spring_boot.Entities.Itinerary;
import com.example.climbing_trip_planner.spring_boot.Repositories.ClimbRepository;
import com.example.climbing_trip_planner.spring_boot.Repositories.CragRepository;
import com.example.climbing_trip_planner.spring_boot.Repositories.ItineraryRepository;
import com.example.climbing_trip_planner.spring_boot.Services.ItineraryService;
import com.example.climbing_trip_planner.spring_boot.dto.ClimbInput;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItineraryServiceImpl implements ItineraryService {
    private final ItineraryRepository repository;
    private final CragRepository cragRepository;
    private final ClimbRepository climbRepository;
    @Override
    public Itinerary getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Itinerary not found: " + id));
    }

    @Override
    public List<Itinerary> getAll() {
        return repository.findAll();
    }

    @Override
    public Itinerary create(Itinerary itinerary) {
        return repository.save(itinerary);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Climb> getClimbsByItinerary(Long itineraryId) {
        return climbRepository.findByItineraryId(itineraryId);
    }

    @Override
    public Itinerary addClimbToItinerary(Long itineraryId, ClimbInput climbInput) {
        Itinerary itinerary = getById(itineraryId);
        Crag crag = cragRepository.findById(climbInput.crag().uuid())
                .orElseGet(() -> {
                    Crag newCrag = new Crag();
                    newCrag.setUuid(climbInput.crag().uuid());
                    newCrag.setName(climbInput.crag().name());
                    newCrag.setArea(climbInput.crag().area());
                    return cragRepository.save(newCrag);
                });

        Climb climb = climbRepository.findById(climbInput.uuid())
                        .orElseGet(() -> {
                            Climb newClimb = new Climb();
                            newClimb.setUuid(climbInput.uuid());
                            newClimb.setName(climbInput.name());
                            newClimb.setGrade(climbInput.grade());
                            newClimb.setType(climbInput.type());
                            newClimb.setCrag(crag);
                            newClimb.setItinerary(itinerary);
                            return climbRepository.save(newClimb);
                        });

        itinerary.getClimbs().add(climb);
        return repository.save(itinerary);
    }

    @Override
    public Itinerary removeClimbFromItinerary(Long itineraryId, UUID climbId) {
        Itinerary itinerary = getById(itineraryId);
        itinerary.getClimbs().removeIf(c -> climbId.equals(c.getUuid()));
        return repository.save(itinerary);
    }


}
