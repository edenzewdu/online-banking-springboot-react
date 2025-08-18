package com.example.server.Repository;


import com.example.server.Model.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    @Query(value = "select * from bankaccount where accountno=?1", nativeQuery = true)
    public BankAccount findByAccountNo(long accountno);

    @Query(value = "select * from bankaccount where user_userid=?1", nativeQuery = true)
    public List<BankAccount> findAllByUserId(String userId);

   // public void deleteByAccountNo(long accountno);

}
