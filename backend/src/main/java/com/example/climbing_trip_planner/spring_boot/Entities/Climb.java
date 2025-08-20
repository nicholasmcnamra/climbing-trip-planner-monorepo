package com.example.climbing_trip_planner.spring_boot.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Data
@Entity
@RequiredArgsConstructor
public class Climb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true, nullable = false)
    private UUID uuid;

    private String name;

    @ManyToOne
    private Crag crag;

    private String grade;

    private String type;

    @ManyToOne
    private Itinerary itinerary;

}
