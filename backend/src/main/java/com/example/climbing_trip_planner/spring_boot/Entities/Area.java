package com.example.climbing_trip_planner.spring_boot.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Data
@Entity
@RequiredArgsConstructor
public class Area {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID uuid;

    private String name;
}
