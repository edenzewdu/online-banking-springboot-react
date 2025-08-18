package com.example.server.Repository;

import com.example.server.Model.Beneficiaries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiaries, Integer> {

    @Query(value = "select * from beneficiaries where user_userid=?1", nativeQuery = true)
    public List<Beneficiaries> findAllByUserId(String userId);

}
