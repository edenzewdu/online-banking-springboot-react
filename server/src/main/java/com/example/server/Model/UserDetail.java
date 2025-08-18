package com.example.server.Model;


import java.sql.Blob;
import java.sql.Date;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "userdetails")
public class UserDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userdetailsid;

    private Blob image;
    private String address;
    private String city;
//    private String pin;
    private String state;
    private String mobile;
    private String fyda;

    // @ColumnTransformer(read = "UPPER(name)", write = "LOWER(?)")
//    private String pan;

    private char gender;

    @Column(name = "birthdate")
    public Date dateOfBirth;

    @OneToOne
    @JsonBackReference
    private User user;

    private int age;
}
