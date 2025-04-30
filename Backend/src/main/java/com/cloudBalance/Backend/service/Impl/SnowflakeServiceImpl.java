package com.cloudBalance.Backend.service.Impl;

import com.cloudBalance.Backend.DTO.CostExplorerRequest;
import com.cloudBalance.Backend.DTO.CostExplorerResponse;
import com.cloudBalance.Backend.DTO.SnowflakeColumnsView;
import com.cloudBalance.Backend.constants.Constants;
import com.cloudBalance.Backend.entity.SnowflakeColumns;
import com.cloudBalance.Backend.exception.SnowflakeColumnsNotFound;
import com.cloudBalance.Backend.repository.SnowflakeColumnsRepository;
import com.cloudBalance.Backend.service.SnowflakeService;
import com.cloudBalance.Backend.utils.SnowflakeQueries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class SnowflakeServiceImpl implements SnowflakeService {
    private final JdbcTemplate snowflakeConnection;

    public SnowflakeServiceImpl(@Qualifier("snowflakeJdbcTemplate") JdbcTemplate snowflakeConnection,
                                SnowflakeColumnsRepository snowflakeColumnsRepository,
                                SnowflakeQueries snowflakeQueries) {
        this.snowflakeConnection = snowflakeConnection;
        this.snowflakeColumnsRepository = snowflakeColumnsRepository;
        this.snowflakeQueries = snowflakeQueries;
    }

    private final SnowflakeColumnsRepository snowflakeColumnsRepository;
    private final SnowflakeQueries snowflakeQueries;

    @Override
    public CostExplorerResponse getCostExplorerData(CostExplorerRequest request) {
        String query = snowflakeQueries.buildQuery(request);
        List<Map<String, Object>> data = snowflakeConnection.queryForList(query);
        CostExplorerResponse res = new CostExplorerResponse();
        res.setData(data);

        if (data.size() > 5) {
            List<Map<String, Object>> topFive = data.subList(0, 5);
            double total = 0;
            for (Map<String, Object> row : data) {
                Object amount = row.get(Constants.TOTAL_AMOUNT);
                if (amount != null) {
                    total += (double) amount;
                }
            }
            Map<String, Object> otherData = new HashMap<>();
            otherData.put("label", "other");
            otherData.put(Constants.TOTAL_AMOUNT, total);
            otherData.put(Constants.USAGE_DATE, topFive.getFirst().get(Constants.USAGE_DATE));
            topFive.add(otherData);
            res.setChartData(topFive);
        } else {
            res.setChartData(data);
        }
        return res;

    }

    public List<SnowflakeColumnsView> getColumns() {
        List<SnowflakeColumnsView> columns = snowflakeColumnsRepository.findAllColumns();
        if (columns.isEmpty()) {
            throw new SnowflakeColumnsNotFound("Snowflake columns not Found");
        }
        return columns;
    }

    public List<String> getFilters(String columnName) {
        SnowflakeColumns column = snowflakeColumnsRepository.findByDisplayName(columnName);
        if (column == null) {
            throw new SnowflakeColumnsNotFound("Snowflake column not Found");
        }
        String query = snowflakeQueries.getDistinct(column.getSnowflakeName());
        return snowflakeConnection.queryForList(query, String.class);
    }
}
