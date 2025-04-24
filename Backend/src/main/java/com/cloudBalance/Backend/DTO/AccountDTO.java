package com.cloudBalance.Backend.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AccountDTO {
    @NotNull(message = "Arn cannot be null")
    private String arn;
    @NotNull(message = "Account id cannot be null")
    private String accountId;
    @NotNull(message = "Account name cannot be null")
    private String accountName;
//    @NotNull(message = "Account role cannot be null")
//    private String accountRole;

    private Boolean isOrphan = true;
}
