package com.cloudBalance.Backend.DTO;

import lombok.Data;

@Data
public class AccountsResponse {
    private Long accountId;
    private String accountName;
    private String accountRole;
    private Boolean isOrphan;
}
