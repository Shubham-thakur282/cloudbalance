package com.cloudBalance.Backend.controller;

import com.cloudBalance.Backend.DTO.CostExplorerRequest;
import com.cloudBalance.Backend.DTO.CostExplorerResponse;
import com.cloudBalance.Backend.DTO.SnowflakeColumnsView;
import com.cloudBalance.Backend.service.SnowflakeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cost-explorer")
@AllArgsConstructor
@Slf4j
public class SnowflakeController {
    private final SnowflakeService snowflakeService;

    @GetMapping
    public ResponseEntity<List<SnowflakeColumnsView>> getSnowflakeColumns() {
        log.info("In test controller");
        return ResponseEntity.ok(snowflakeService.getColumns());
    }

    @GetMapping("/{column}")
    public ResponseEntity<List<String>> getSnowflakeColumnFilter(@PathVariable String column) {
        return ResponseEntity.ok(snowflakeService.getFilters(column));
    }

    @PostMapping
    public ResponseEntity<CostExplorerResponse> getCostExplorerData(
            @Valid @RequestBody CostExplorerRequest request) {
        log.info("Request for cost explorer data");
        return ResponseEntity.ok(snowflakeService.getCostExplorerData(request));
    }


}
