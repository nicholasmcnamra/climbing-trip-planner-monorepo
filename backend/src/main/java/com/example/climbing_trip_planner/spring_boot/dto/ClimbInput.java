package com.example.climbing_trip_planner.spring_boot.dto;

import com.example.climbing_trip_planner.spring_boot.Controllers.ItineraryController;

import java.util.UUID;

public record ClimbInput(Long id, UUID uuid, String name, String grade, String type, CragInput crag) {}
