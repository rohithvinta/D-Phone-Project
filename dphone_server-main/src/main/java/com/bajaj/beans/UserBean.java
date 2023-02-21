package com.bajaj.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserBean {
    private int id;
    private String name;
    private String email;
    private String password;
    private String roles;
    private int points;
    private String referralCode;
    private String phoneNumber;
    private Date updatedAt;
}
