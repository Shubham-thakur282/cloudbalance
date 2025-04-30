package com.cloudBalance.Backend.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@Data
public class CostExplorerRequest {
    @NotNull(message = "Account Id can not be null")
    @NotEmpty(message = "Account Id can not be empty")
    private String accountId;

    @NotNull(message = "Group by can not be null")
    @NotEmpty(message = "Group by can not be empty")
    private String groupBy;
    private Map<String, List<String>> filters;
    private Long startYear;
    private Long startMonth;
    private Long endYear;
    private Long endMonth;
}

