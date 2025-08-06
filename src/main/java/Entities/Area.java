package Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@Entity
public class Area {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID uuid;

    private String name;
}
