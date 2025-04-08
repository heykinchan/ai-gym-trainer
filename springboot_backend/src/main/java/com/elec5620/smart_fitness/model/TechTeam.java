package com.elec5620.smart_fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity object for user database table.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
public class TechTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    private int version;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    public TechTeam(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
