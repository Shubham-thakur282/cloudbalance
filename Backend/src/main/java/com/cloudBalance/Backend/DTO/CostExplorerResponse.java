package com.cloudBalance.Backend.DTO;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class CostExplorerResponse {
    private List<Map<String, Object>> data;
    private List<Map<String, Object>> chartData;
}
