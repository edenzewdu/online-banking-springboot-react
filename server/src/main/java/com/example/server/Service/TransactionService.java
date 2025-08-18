package com.example.server.Service;


import com.example.server.Model.BankAccount;
import com.example.server.Model.Transactions;

import java.util.List;

public interface TransactionService {
    public List<Transactions> getDetailsByAccount(long fromAccount);
    public List<Transactions> getTransactionsByReceiver(long toAccount);
    public Transactions save(Transactions theTransactions);
    public Transactions setTransactions(BankAccount bankAccount, long toAccount, double amount, String description, String status);
    public Transactions getTransactionsById(int transactionId);
    public List<Transactions> findAll();
    public List<Transactions> getAllByAccount(long accountno);
    public Transactions getCurrentTransaction(long accountno);
}
