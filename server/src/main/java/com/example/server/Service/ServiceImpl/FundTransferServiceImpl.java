package com.example.server.Service.ServiceImpl;


import com.example.server.Model.BankAccount;
import com.example.server.Model.Transactions;
import com.example.server.Repository.TransactionRepository;
import com.example.server.Service.FundTransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FundTransferServiceImpl implements FundTransferService {


    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transactions save(Transactions transactions) {
        return transactionRepository.save(transactions);
    }

    @Override
    public BankAccount updateFundDeducion(BankAccount bankAccount) {
        return null;
    }
    
}
