package com.example.server.Service.ServiceImpl;


import com.example.server.Model.BankAccount;
import com.example.server.Model.Transactions;
import com.example.server.Repository.TransactionRepository;
import com.example.server.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<Transactions> getDetailsByAccount(long fromAccount) {
        
        if(transactionRepository.getDetailsByAccountNo(fromAccount)==null)
        {
            return null;
        }
       return transactionRepository.getDetailsByAccountNo(fromAccount); 
    }

    @Override
    public List<Transactions> getTransactionsByReceiver(long toAccount) {

        if(transactionRepository.getTransactionsByToAccount(toAccount)==null)
        {
            return null;
        }
            return transactionRepository.getTransactionsByToAccount(toAccount);
        }

  
    @Override
    public Transactions save(Transactions transaction) {
        transactionRepository.save(transaction);
        return transactionRepository.getCurrentTransaction(transaction.getToAccount());
    }

    @Override
    public Transactions setTransactions(BankAccount bankAccount, long toAccount, double amount, String description, String status) {
            Transactions newTransaction = new Transactions();
            newTransaction.setFromAccount(bankAccount.getAccountno());
            newTransaction.setToAccount(toAccount);
            newTransaction.setAmount(amount);
            newTransaction.setDescription(description);
            newTransaction.setTransactionStatus(status);
            //newTransaction.setTransactionDate(date);

            transactionRepository.save(newTransaction);
            return transactionRepository.getTransactionsByFromAccount(bankAccount.getAccountno());

    }

    @Override
    public Transactions getTransactionsById(int transactionId) {
        return transactionRepository.findById(transactionId).orElse(null);
    }

    @Override
    public List<Transactions> findAll() {
        
        return transactionRepository.findAll(Sort.by(Sort.Direction.DESC, "transactionDate", "transactionTime"));
    }

    @Override
    public List<Transactions> getAllByAccount(long accountno) {
        return transactionRepository.getByAccount(accountno);
    }

    @Override
    public Transactions getCurrentTransaction(long accountno) {
        return transactionRepository.getCurrentTransaction(accountno);
    }

 

}