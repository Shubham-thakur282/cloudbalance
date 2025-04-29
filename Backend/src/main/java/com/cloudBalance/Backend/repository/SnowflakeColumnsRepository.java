package com.cloudBalance.Backend.repository;

import com.cloudBalance.Backend.DTO.SnowflakeColumnsView;
import com.cloudBalance.Backend.entity.SnowflakeColumns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SnowflakeColumnsRepository extends JpaRepository<SnowflakeColumns,Long> {
    SnowflakeColumns findByDisplayName(String displayName);
    @Query(value = """
            SELECT s.id as id,
            s.display_name as displayName,
            s.snowflake_name as snowflakeName
            from snowflake_columns s
            """,nativeQuery = true)
    List<SnowflakeColumnsView> findAllColumns();

}
