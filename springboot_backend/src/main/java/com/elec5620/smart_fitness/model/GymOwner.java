package com.elec5620.smart_fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Entity object for gym owner database table.
 */
@Getter
@NoArgsConstructor
@Entity
public class GymOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    private int version;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    public GymOwner(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
