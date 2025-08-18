package com.example.server.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "transactions")
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int transactionId;

    @Column
    private long fromAccount;

    @Column
    private double sender;

    @Column
    private long toAccount;

    @Column
    private double receiver;

    @Column
    private Double amount;

    @Column
    private String transactionStatus;

    @Column
    private String transactionDate;

    @Column
    private String transactionTime;

    @Column
    private String description;

}
