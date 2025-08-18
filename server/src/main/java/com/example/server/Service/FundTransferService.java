package com.example.server.Service;


import com.example.server.Model.BankAccount;
import com.example.server.Model.Transactions;

public interface FundTransferService {
   //public Transactions fundTransfer(long accounNo,String name, String desctription, double amount );
    public Transactions save(Transactions transactions);
    public BankAccount updateFundDeducion(BankAccount bankAccount);

}
