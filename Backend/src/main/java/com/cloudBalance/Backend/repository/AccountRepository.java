package com.cloudBalance.Backend.repository;

import com.cloudBalance.Backend.DTO.AccountDTO;
import com.cloudBalance.Backend.DTO.AccountsView;
import com.cloudBalance.Backend.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Accounts,Long> {
    Optional<Accounts> findByAccountId(Long AccountId);
    List<Accounts> findAllByAccountIdIn(List<Long> accountIds);

    @Query(value = """
            SELECT account_id as accountId,
            account_name as accountName,
            account_role as accountRole,
            is_orphan as isOrphan
            from accounts
            """,nativeQuery = true)
    List<AccountsView> findAllAccounts();
}
