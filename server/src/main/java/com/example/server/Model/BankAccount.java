package com.example.server.Model;


import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "bankaccount")
public class BankAccount {

    @Id
    private Long accountno;

    @Column
    private String accountType;

    @Column
    private String dateCreated;

    @Column
    private String timeCreated;
    @Column
    private Double balance;

    private boolean isactive;

    @ManyToOne
    @JsonBackReference(value = "user-account")
    private User user;

    // @OneToOne(mappedBy = "account")
    // @JsonManagedReference
    // private LoanAccount loanAccount;

}
