package com.example.server.Controllers;


import com.example.server.Model.BankAccount;
import com.example.server.Model.Transactions;
import com.example.server.Model.User;
import com.example.server.Service.AccountService;
import com.example.server.Service.SignUpService;
import com.example.server.Service.TransactionService;
import com.example.server.helper.Helper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

//
//@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping(path = "/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private SignUpService signUpService;

    @GetMapping("/accountdetails/{accountNo}")
    public BankAccount findAccount(@PathVariable long accountNo) {
        System.out.println("Acc Details");
        return accountService.findByAccountNo(accountNo);
    }

    @GetMapping("/accounts/{all}")
    public ResponseEntity<?> findAllAccounts(@PathVariable int all) {
        List<Object> objs = new ArrayList<>();

        List<User> users = signUpService.GetAllUsers();
        List<User> reqUsers = new ArrayList<>();

        if (all == 0)
            for (User user : users) {
                if (!user.getAccounts().isEmpty()) {
                    reqUsers.add(user);
                }
            }

        if (all == 1)
            for (User user : users) {
                if (user.getAccounts().isEmpty()) {
                    reqUsers.add(user);
                }
            }

        if (all == 2) {
            objs.add(signUpService.GetAllUsers());
            return new ResponseEntity<>(objs, HttpStatus.OK);
        }

        objs.add(reqUsers);
        return new ResponseEntity<>(objs, HttpStatus.OK);
    }

    @GetMapping("/accounts/mail")
    public ResponseEntity<?> findAllAccounts(@Param(value = "") String email) {

        User user = signUpService.findByEmail(email);
        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        else
            return new ResponseEntity<>("User does not exists", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getallreq")
    public ResponseEntity<?> getAllReq() {
        List<User> users = signUpService.GetAllUsers();
        List<User> reqUsers = new ArrayList<>();
        for (User user : users) {
            if (!accountService.findByUserId(user.getUserId()).isEmpty() || !user.isAccountopenningreq()) {
                // System.out.println("\n\n Skipping******************************************
                // "+user.getUserId()+"\n\n");
                continue;
            } else {
                // System.out.println("\n\n adding \n\n");
                reqUsers.add(user);
            }
        }

        return new ResponseEntity<>(reqUsers, HttpStatus.OK);
    }

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> saveAccount(@RequestBody BankAccount bankAccount, @PathVariable String userId) {
        if (!signUpService.getAUser(userId).get().isAccountopenningreq())
            return new ResponseEntity<>("Create account not allowed", HttpStatus.CONFLICT);

        List<BankAccount> accounts = accountService.findByUserId(userId);

        if (accounts != null) {
            for (BankAccount acc : accounts) {
                if (acc.getAccountType().equals(bankAccount.getAccountType()))
                    return new ResponseEntity<>("Already have an account", HttpStatus.CONFLICT);
            }
        }
        BankAccount newAccount = new BankAccount();
        newAccount.setAccountType(bankAccount.getAccountType());
        newAccount.setBalance(10000.00);
        newAccount.setIsactive(true);

        long accountno;
        do {
            accountno = Helper.generateAccountNo();
        } while (!accountService.validateAccNo(accountno));

        newAccount.setAccountno(accountno);
        newAccount.setDateCreated(Helper.dateStamp());
        newAccount.setTimeCreated(Helper.timeStamp());

        return new ResponseEntity<>(accountService.createAccount(newAccount, userId), HttpStatus.OK);
    }

    @DeleteMapping("/accounts/{accountno}")
    private ResponseEntity<?> deleteAccount(@PathVariable long accountno) {
        BankAccount bankAccount = accountService.findByAccountNo(accountno);
        if (bankAccount != null) {
            if (bankAccount.getBalance() > 1.00)
                return new ResponseEntity<>("Account balance should be zero", HttpStatus.OK);
            else
                return new ResponseEntity<BankAccount>(accountService.deleteAccount((long) accountno), HttpStatus.OK);
        } else
            return new ResponseEntity<>("Account does not exists", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/accounts/suspend/{accountno}")
    private ResponseEntity<?> suspendAccount(@PathVariable long accountno) {
        BankAccount account = accountService.findByAccountNo(accountno);
        if (account != null) {
            account.setIsactive(false);
            accountService.updateAccount(account);
            return new ResponseEntity<>("Account Suspended", HttpStatus.OK);
        }
        return new ResponseEntity<>("Account does not exists", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/accounts/activate/{accountno}")
    private ResponseEntity<?> activateAccount(@PathVariable long accountno) {
        BankAccount account = accountService.findByAccountNo(accountno);
        if (account != null) {
            account.setIsactive(true);
            accountService.updateAccount(account);
            return new ResponseEntity<>("Account activated", HttpStatus.OK);
        }
        return new ResponseEntity<>("Account does not exists", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/accounts/fixdeposit")
    private ResponseEntity<?> fixedDeposit(@RequestBody BankAccount bankAccount) {
        BankAccount account = accountService.findByAccountNo(bankAccount.getAccountno());
        if (account != null) {
            double newbalance = bankAccount.getBalance();
            if (account.getBalance() > 0) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            } else {
                account.setBalance(newbalance);
            }
            accountService.updateAccount(account);
            Transactions firstTransaction = new Transactions();
            firstTransaction.setFromAccount(99999999);
            firstTransaction.setToAccount(account.getAccountno());
            firstTransaction.setAmount(account.getBalance());
            firstTransaction.setDescription("Fixed Deposit");
            firstTransaction.setTransactionStatus("Completed");
            firstTransaction.setTransactionDate(Helper.dateStamp());
            firstTransaction.setTransactionTime(Helper.timeStamp());
            transactionService.save(firstTransaction);

            return new ResponseEntity<BankAccount>(accountService.findByAccountNo(bankAccount.getAccountno()),
                    HttpStatus.OK);
        } else
            return new ResponseEntity<>("Account does not exists", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/checkbal/{accountno}")
    private ResponseEntity<?> checkBalance(@PathVariable long accountno) {
        List<BankAccount> lst = new ArrayList<>();
        if (accountService.findByAccountNo(accountno) != null) {

            lst.add(accountService.findByAccountNo(accountno));
            return new ResponseEntity<>(lst, HttpStatus.OK);
        } else
            return new ResponseEntity<>(lst, HttpStatus.NOT_FOUND);
    }

}
