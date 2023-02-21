package com.bajaj.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ReferralEntity")
public class ReferralEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "referrerId")
    private int referrerId;
    @Column(name = "refererCode")
    private String referrerCode;
    @Column(name = "referralName")
    private String referralName;
    @Column(name = "referralEmail")
    private String referralEmail;
    @Column(name = "referralPhoneNumber")
    private String referralPhoneNumber;
    @Column(name = "referredDate")
    @Temporal(TemporalType.DATE)
    private Date referredDate;
}
