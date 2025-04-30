package com.cloudBalance.Backend.DTO;

import lombok.Data;

@Data
public class AccountsResponse {
    private String accountId;
    private String accountName;
    private Boolean isOrphan;
}
