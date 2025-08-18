package com.example.server.Model;


import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "beneficiaries")
public class Beneficiaries {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int beneficiaryid;

    private String beneficiaryname;

    private long beneaccountno;

    private String relation;

    @ManyToOne
    @JsonBackReference(value = "user-beneficiaries")
    private User user;
    //@JsonBackReference(value = "user-beneficiaries")
}

