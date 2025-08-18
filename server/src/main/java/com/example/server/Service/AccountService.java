package com.example.server.Service;

import com.example.server.Model.BankAccount;

import java.util.List;

public interface AccountService {

    public BankAccount findByAccountNo(long accountNo);
    public List<BankAccount> findAll();
    public BankAccount saveAccount(BankAccount bankAccount);
    public void updateAccount(BankAccount bankAccount);
    public void deleteAccount(BankAccount bankAccount);
    public boolean validateAccNo(long accountno);
    public BankAccount deleteAccount(long accoutno);
    public List<BankAccount> createAccount(BankAccount newAccount, String userId);
    public List<BankAccount> findByUserId(String userId);
}
