package com.bajaj.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="UserEntity")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name="email")
    private String email;
    @Column(name="password")
    private String password;
    @Column(name="roles")
    private String roles;
    @Column(name = "referralCode")
    private String referralCode;//Need to add database
    @Column(name = "points")
    private int points;//Need to add to database
    @Column(name = "phoneNumber")
    private String phoneNumber;
    @Column(name = "updatedAt")
    @Temporal(TemporalType.DATE)
    private Date updatedAt;
}

