package com.example.server.Controllers;


import com.example.server.Model.BankAccount;
import com.example.server.Model.Transactions;
import com.example.server.Service.AccountService;
import com.example.server.Service.BeneficiariesService;
import com.example.server.Service.TransactionService;
import com.example.server.helper.Helper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/fund")
public class FundTransferController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private BeneficiariesService beneficiariesService;

    @PostMapping("/transfer")
    public ResponseEntity<?> fundTransfer(@RequestBody BankAccount bankAccount,
            @Param(value = "") Long toAccount, @Param(value = "") double amount,
            @Param(value = "") String description) {
        System.out.println("==================================================================demo bank የአካውንት ቁጥር: "
                + bankAccount.getAccountno());

        long bankaccountno = bankAccount.getAccountno();

        System.out.println("313123123123____________" + toAccount);
        System.out.println(
                "313123123123 demo____________" + accountService.findByAccountNo(bankaccountno).toString());

        if (accountService.findByAccountNo(bankaccountno) != null) {
            System.out.println("---------------------------entry point1_______________________________");
            BankAccount senderAccount = accountService.findByAccountNo(bankAccount.getAccountno());
            if (!senderAccount.isIsactive()) {
                Transactions newTransactions = new Transactions();
                newTransactions.setFromAccount(senderAccount.getAccountno());
                newTransactions.setToAccount(toAccount);
                newTransactions.setAmount(amount);
                newTransactions.setDescription(description);
                newTransactions.setTransactionDate(Helper.dateStamp());
                newTransactions.setTransactionTime(Helper.timeStamp());
                newTransactions.setTransactionStatus("Declined");


                newTransactions.setSender(accountService.findByAccountNo(bankaccountno).getBalance());
                newTransactions.setReceiver(accountService.findByAccountNo(toAccount).getBalance());


                transactionService.save(newTransactions);
                return new ResponseEntity<>(transactionService.getCurrentTransaction(senderAccount.getAccountno()),
                        HttpStatus.NOT_ACCEPTABLE);
            }

            if (senderAccount.getBalance() < amount) {
                Transactions newTransactions = new Transactions();
                newTransactions.setFromAccount(senderAccount.getAccountno());
                newTransactions.setToAccount(toAccount);
                newTransactions.setAmount(amount);
                newTransactions.setDescription(description);
                newTransactions.setTransactionDate(Helper.dateStamp());
                newTransactions.setTransactionTime(Helper.timeStamp());
                newTransactions.setTransactionStatus("Insufficient Bal");

                newTransactions.setSender(accountService.findByAccountNo(bankaccountno).getBalance());
                newTransactions.setReceiver(accountService.findByAccountNo(toAccount).getBalance());

                transactionService.save(newTransactions);
                return new ResponseEntity<>(transactionService.getCurrentTransaction(senderAccount.getAccountno()),
                        HttpStatus.NOT_ACCEPTABLE);
            } else {
                System.out.println("---------------------------entry point2_______________________________");
                BankAccount receiverAccount = accountService.findByAccountNo(toAccount);
                System.out.println("receiverAccount accountno check 1" + receiverAccount.getAccountno());
                System.out.println("receiverAccount accountno check 2" + toAccount);
                // if (receiverAccount.getAccountno() == toAccount) {
                System.out.println("---------------------------entry point3_______________________________");
                senderAccount.setBalance(senderAccount.getBalance() - amount);
                receiverAccount.setBalance(receiverAccount.getBalance() + amount);

                Transactions newTransactions = new Transactions();
                newTransactions.setFromAccount(senderAccount.getAccountno());
                newTransactions.setToAccount(receiverAccount.getAccountno());
                newTransactions.setAmount(amount);
                newTransactions.setDescription(description);
                newTransactions.setTransactionDate(Helper.dateStamp());
                newTransactions.setTransactionTime(Helper.timeStamp());
                newTransactions.setTransactionStatus("Completed");
                accountService.updateAccount(senderAccount);
                accountService.updateAccount(receiverAccount);

                newTransactions.setSender(accountService.findByAccountNo(bankaccountno).getBalance());
                newTransactions.setReceiver(accountService.findByAccountNo(toAccount).getBalance());

                transactionService.save(newTransactions);
                System.out.println("---------------------------entry pointinfinite_______________________________");
                return new ResponseEntity<Transactions>(
                        transactionService.getCurrentTransaction(senderAccount.getAccountno()),
                        HttpStatus.OK);
                // }

            }
        }
        return new ResponseEntity<>("Account Not Exists", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/transfer/benficiary/{benId}")
    public ResponseEntity<?> fundTransferToBeneficiary(@RequestBody BankAccount bankAccount, @PathVariable int benId,
            @Param(value = "") double amount, @Param(value = "") String description) {
        BankAccount receiverAccount = accountService
                .findByAccountNo(beneficiariesService.getBeneficiaryById(benId).getBeneaccountno());
        BankAccount senderAccount = accountService.findByAccountNo(bankAccount.getAccountno());

        if (receiverAccount != null && senderAccount != null) {
            if (!senderAccount.isIsactive()) {
                Transactions newTransactions = new Transactions();
                newTransactions.setFromAccount(senderAccount.getAccountno());
                newTransactions.setToAccount(receiverAccount.getAccountno());
                newTransactions.setAmount(amount);
                newTransactions.setDescription("Beneficiary Transaction : " + description);
                newTransactions.setTransactionDate(Helper.dateStamp());
                newTransactions.setTransactionTime(Helper.timeStamp());
                newTransactions.setTransactionStatus("Declined");
                transactionService.save(newTransactions);
                return new ResponseEntity<>(transactionService.getCurrentTransaction(senderAccount.getAccountno()),
                        HttpStatus.NOT_ACCEPTABLE);
            }
            if (senderAccount.getBalance() < amount) {
                Transactions newTransactions = new Transactions();
                newTransactions.setFromAccount(senderAccount.getAccountno());
                newTransactions.setToAccount(receiverAccount.getAccountno());
                newTransactions.setAmount(amount);
                newTransactions.setDescription("Beneficiary Transaction : " + description);
                newTransactions.setTransactionDate(Helper.dateStamp());
                newTransactions.setTransactionTime(Helper.timeStamp());
                newTransactions.setTransactionStatus("Insufficient Bal");
                transactionService.save(newTransactions);
                return new ResponseEntity<>(transactionService.getCurrentTransaction(senderAccount.getAccountno()),
                        HttpStatus.NOT_ACCEPTABLE);
            } else {

                senderAccount.setBalance(senderAccount.getBalance() - amount);
                receiverAccount.setBalance(receiverAccount.getBalance() + amount);

                Transactions newTransactions = new Transactions();
                newTransactions.setFromAccount(senderAccount.getAccountno());
                newTransactions.setToAccount(receiverAccount.getAccountno());
                newTransactions.setAmount(amount);
                newTransactions.setDescription("Beneficiary Transaction : " + description);
                newTransactions.setTransactionDate(Helper.dateStamp());
                newTransactions.setTransactionTime(Helper.timeStamp());
                newTransactions.setTransactionStatus("Completed");

                // critical section to be synchronised in future
                accountService.updateAccount(senderAccount);
                accountService.updateAccount(receiverAccount);
                transactionService.save(newTransactions);
                return new ResponseEntity<>(transactionService.getCurrentTransaction(senderAccount.getAccountno()),
                        HttpStatus.OK);
            }

        }

        return new ResponseEntity<>("Account Not Exists", HttpStatus.NOT_FOUND);
    }

}
