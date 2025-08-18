package com.example.server.Service;


import com.example.server.Model.Beneficiaries;

import java.util.List;

public interface BeneficiariesService {

    Beneficiaries createBeneficiary(Beneficiaries beneficiary);

    public Beneficiaries getBeneficiaryById(int beneficiaryId);

    List<Beneficiaries> getAllBeneficiaries();

    Beneficiaries updateBeneficiary(Beneficiaries beneficiary);

    void deleteBeneficiary(int beneficiaryId);
    
    List<Beneficiaries> getBeneficiariesByUserId(String userId);


    List<Beneficiaries> createBeneficiaries(Beneficiaries beneficiary, String userId);
}
