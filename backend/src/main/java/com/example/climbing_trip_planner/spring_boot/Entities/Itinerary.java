package com.example.climbing_trip_planner.spring_boot.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@RequiredArgsConstructor
public class Itinerary {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne
    private Area selectedArea;

    @ManyToMany
    @JoinTable(name = "trip_selected_crags")
    private List<Crag> selectedCrags = new ArrayList<>();

    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Climb> climbs = new ArrayList<>();
}
