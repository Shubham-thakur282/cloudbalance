package com.cloudBalance.Backend.DTO;

import lombok.Data;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@Data
public class CostExplorerRequest {
    private String accountId;
    private String groupBy;
    private Map<String, List<String>> filters;
    private Long startYear;
    private Long startMonth;
    private Long endYear;
    private Long endMonth;
}

