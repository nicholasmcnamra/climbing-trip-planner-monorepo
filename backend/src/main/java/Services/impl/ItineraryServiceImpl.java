package Services.impl;

import Entities.Climb;
import Entities.Crag;
import Entities.Itinerary;
import Repositories.ClimbRepository;
import Repositories.CragRepository;
import Repositories.ItineraryRepository;
import Services.ItineraryService;
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
    public Itinerary addClimbToItinerary(Long itineraryId, UUID climbId, UUID cragId) {
        Itinerary itinerary = getById(itineraryId);
        Crag crag = cragRepository.findById(cragId)
                .orElseThrow(() -> new EntityNotFoundException("Crag not found: " + cragId));

        Climb climb = new Climb();
        climb.setItinerary(itinerary);
        climb.setUuid(climbId);
        climb.setCrag(crag);

        climbRepository.save(climb);
        itinerary.getClimbs().add(climb);
        return repository.save(itinerary);
    }
}
