package com.example.server.Model;


import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

//@Entity
@Getter
@Setter
@Table(name = "loanaccount")
public class LoanAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long loanaccountno;
    @Column
    private Double remainingAmount;
    @Column
    private Double loanAmount;
    @Column
    private String loanPurpose;
    @Column
    private Double interest;
    @Column
    private int tenureInMonths;
    @Column
    private int monthlyEMI;

    @ManyToOne
    @JsonBackReference(value = "user-loan")
    private User user;

    @OneToOne
    @JsonBackReference
    private BankAccount bankAccount;
}
