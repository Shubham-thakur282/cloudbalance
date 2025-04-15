package com.cloudBalance.Backend.service;

import com.cloudBalance.Backend.DTO.AccountDTO;
import com.cloudBalance.Backend.DTO.AccountsResponse;
import com.cloudBalance.Backend.DTO.AccountsView;

import java.util.List;

public interface AccountsService {
    AccountDTO createAccount(AccountDTO account);
    List<AccountsResponse> getAccounts();
}
