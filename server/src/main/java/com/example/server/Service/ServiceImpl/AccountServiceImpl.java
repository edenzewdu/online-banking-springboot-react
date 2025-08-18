package com.example.server.Service.ServiceImpl;


import com.example.server.Model.BankAccount;
import com.example.server.Model.User;
import com.example.server.Repository.BankAccountRepository;
import com.example.server.Repository.UserRepository;
import com.example.server.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired 
    private UserRepository userRepo;

    @Override
    public BankAccount findByAccountNo(long accountNo) {
        return bankAccountRepository.findByAccountNo(accountNo);
        //return null;

    }

    @Override
    public List<BankAccount> findAll() {
        return bankAccountRepository.findAll();
    }

    @Override
    public BankAccount saveAccount(BankAccount bankAccount) {
        return bankAccountRepository.save(bankAccount);
    }

    @Override
    public void updateAccount(BankAccount bankAccount) {

        BankAccount account = bankAccountRepository.findByAccountNo(bankAccount.getAccountno());
        //account.setUser(bankAccount.getUser());
        account.setIsactive(bankAccount.isIsactive());
        account.setBalance(bankAccount.getBalance());
        bankAccountRepository.save(account);// **need to add query**
    }

    @Override
    public void deleteAccount(BankAccount bankAccount) {
        bankAccountRepository.deleteById(bankAccount.getAccountno());
    }

    @Override
    public boolean validateAccNo(long accountno) {
        if(!bankAccountRepository.existsById(accountno))
            return true;
        else
            return false;
    }

    @Override
    public BankAccount deleteAccount(long accoutno) {
        BankAccount temp = bankAccountRepository.findByAccountNo(accoutno);
        bankAccountRepository.deleteById(accoutno);
        return temp;
    }

    @Override
    public List<BankAccount> createAccount(BankAccount newAccount, String userId) {
        User theUser = userRepo.findById(userId).get();
        List<BankAccount> existingAccounts= bankAccountRepository.findAllByUserId(userId);
       
        //List<BankAccount> bankAccounts = new ArrayList<>();
        existingAccounts.add(newAccount);

        theUser.setAccounts(existingAccounts);

        User savingUpdatedUser = userRepo.save(theUser);

        return savingUpdatedUser.getAccounts();

    }

    @Override
    public List<BankAccount> findByUserId(String userId) {
        return bankAccountRepository.findAllByUserId(userId);
    }

}
