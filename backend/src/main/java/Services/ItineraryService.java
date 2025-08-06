package Services;

import Entities.Climb;
import Entities.Crag;
import Entities.Itinerary;

import java.util.List;
import java.util.UUID;

public interface ItineraryService {
    Itinerary getById(Long id);
    List<Itinerary> getAll();
    Itinerary create(Itinerary itinerary);
    void delete(Long id);

    List<Climb> getClimbsByItinerary(Long itineraryId);
    Itinerary addClimbToItinerary(Long itineraryId, UUID climbId, UUID cragId);
}
