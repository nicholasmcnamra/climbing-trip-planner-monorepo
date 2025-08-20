package com.example.climbing_trip_planner.spring_boot.Services;

import com.example.climbing_trip_planner.spring_boot.Entities.Area;
import com.example.climbing_trip_planner.spring_boot.Entities.Crag;

import java.util.List;
import java.util.UUID;

public interface CragService extends BaseService<Crag, UUID> {
    List<Crag> findByArea(Area area);
}
