package com.cloudBalance.Backend.utils;

import com.cloudBalance.Backend.DTO.CostExplorerRequest;
import com.cloudBalance.Backend.DTO.SnowflakeColumnsView;
import com.cloudBalance.Backend.entity.SnowflakeColumns;
import com.cloudBalance.Backend.exception.SnowflakeColumnsNotFound;
import com.cloudBalance.Backend.repository.SnowflakeColumnsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class SnowflakeQueries {

    private final SnowflakeColumnsRepository snowflakeColumnsRepository;

    public String getDistinct(String column) {
        return "SELECT DISTINCT " +
                column +
                " FROM COST_EXPLORER WHERE "+column+" IS NOT NULL LIMIT 10 ";
    }

    public String buildQuery(CostExplorerRequest request) {
        SnowflakeColumns groupByCol = snowflakeColumnsRepository.findByDisplayName(request.getGroupBy());

        if (groupByCol == null) {
            throw new SnowflakeColumnsNotFound("Column not found");
        }

        StringBuilder query = new StringBuilder();
        query.append(buildSelect(groupByCol));
        query.append(" WHERE ").append(buildWhere(request))
                .append(" ")
                .append(buildInBetween(request));
        query.append(buildGroupByAndOrderBy(groupByCol));
        return query.toString();
    }

    private String buildSelect(SnowflakeColumns column) {
        return new StringBuilder("SELECT ")
                .append("TO_CHAR(USAGESTARTDATE, 'YYYY-MM') AS USAGE_DATE, ")
                .append(column.getSnowflakeName())
                .append(" as \"")
                .append(column.getDisplayName())
                .append("\", SUM(LINEITEM_USAGEAMOUNT) AS TOTAL_AMOUNT ")
                .append(" FROM COST_EXPLORER ")
                .toString();
    }

    private String buildInBetween(CostExplorerRequest request) {
        if (request.getStartYear() != null && request.getStartMonth() != null
                && request.getEndYear() != null && request.getEndMonth() != null) {
            StringBuilder inBetween = new StringBuilder();
            if (!request.getFilters().isEmpty()) {
                inBetween.append(" AND ");
            }
            inBetween.append("USAGESTARTDATE BETWEEN TO_TIMESTAMP('")
                    .append(request.getStartYear()).append("-").append(request.getStartMonth()).append("-01') ")
                    .append("AND TO_TIMESTAMP('")
                    .append(request.getEndYear()).append("-").append(request.getEndMonth()).append("-01')");
            return inBetween.toString();
        }
        return "";
    }

    private String buildWhere(CostExplorerRequest request) {
        StringBuilder whereQuery = new StringBuilder();
        whereQuery.append("LINKEDACCOUNTID = '").append(request.getAccountId()).append("'");

        Map<String, List<String>> filters = request.getFilters();
        List<SnowflakeColumnsView> columns = snowflakeColumnsRepository.findAllColumns();

        if (filters != null && !filters.isEmpty()) {
            String filterConditions = filters.entrySet().stream()
                    .map(entry -> {
                        String displayName = entry.getKey();
                        List<String> values = entry.getValue();

                        // Check if the column exists in the columns list
                        SnowflakeColumnsView matchedColumn = columns.stream()
                                .filter(col -> displayName.equalsIgnoreCase(col.getDisplayName()))
                                .findFirst()
                                .orElseThrow(() -> new SnowflakeColumnsNotFound("Column not found for display name: " + displayName));

                        String columnName = matchedColumn.getSnowflakeName();

                        // Generate filter condition
                        String valuesCondition = values.stream()
                                .map(value -> columnName + " = '" + value + "'")
                                .collect(Collectors.joining(" OR "));
                        return "(" + valuesCondition + ")";
                    })
                    .collect(Collectors.joining(" AND "));

            if (!whereQuery.isEmpty()) {
                whereQuery.append(" AND ");
            }

            whereQuery.append(filterConditions);
        }

        return whereQuery.toString();
    }


    private String buildGroupByAndOrderBy(SnowflakeColumns column) {
        return new StringBuilder().append(" GROUP BY ")
                .append(column.getSnowflakeName())
                .append(" , TO_CHAR(USAGESTARTDATE, 'YYYY-MM') ")
                .append(" ORDER BY TOTAL_AMOUNT DESC")
                .toString();
    }

}
