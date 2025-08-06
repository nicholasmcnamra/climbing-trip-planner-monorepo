package Services;

import Entities.Area;
import Entities.Crag;

import java.util.List;
import java.util.UUID;

public interface CragService extends BaseService<Crag, UUID> {
    List<Crag> findByArea(Area area);
}
