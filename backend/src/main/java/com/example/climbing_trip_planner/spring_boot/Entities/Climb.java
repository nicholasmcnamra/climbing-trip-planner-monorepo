package com.example.climbing_trip_planner.spring_boot.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@Entity
public class Climb {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID uuid;

    private String name;

    @ManyToOne
    private Crag crag;

    private String grade;

    private String type;

    @ManyToOne
    private Itinerary itinerary;

}
