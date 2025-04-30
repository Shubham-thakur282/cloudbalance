package com.cloudBalance.Backend.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AccountDTO {
    @NotNull(message = "Arn cannot be null")
    @NotEmpty(message = "Arn cannot be empty")
    private String arn;
    @NotNull(message = "Account id cannot be null")
    @NotEmpty(message = "AccountId cannot be empty")
    @Size(min = 12, max = 12,message = "Account Id should be of 12 digits")
    private String accountId;
    @NotNull(message = "Account name cannot be null")
    @NotEmpty(message = "Account name cannot be empty")
    private String accountName;

    private Boolean isOrphan = true;
}
