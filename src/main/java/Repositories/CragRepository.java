package Repositories;

import Entities.Area;
import Entities.Crag;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface CragRepository extends JpaRepository<Crag, UUID> {
    List<Crag> findByArea(Area area);
}
