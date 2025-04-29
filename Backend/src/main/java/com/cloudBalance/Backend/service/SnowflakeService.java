package com.cloudBalance.Backend.service;

import com.cloudBalance.Backend.DTO.CostExplorerRequest;
import com.cloudBalance.Backend.DTO.CostExplorerResponse;
import com.cloudBalance.Backend.DTO.SnowflakeColumnResponse;
import com.cloudBalance.Backend.DTO.SnowflakeColumnsView;

import java.util.List;
import java.util.Map;

public interface SnowflakeService {
     CostExplorerResponse getCostExplorerData(CostExplorerRequest request);
     List<String> getFilters(String columnName);
     List<SnowflakeColumnsView> getColumns();
}
