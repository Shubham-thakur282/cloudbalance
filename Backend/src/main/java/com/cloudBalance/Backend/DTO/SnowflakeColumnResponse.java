package com.cloudBalance.Backend.DTO;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class SnowflakeColumnResponse {
    List<SnowflakeColumnsView> columns;
    Map<String,Object> filters;
}
