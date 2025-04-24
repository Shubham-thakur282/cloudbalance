const AccountDropdown = ({ accounts, selectedAccount, handleChange }) => {
  return (
    <select
      className="account-dropdown"
      value={selectedAccount?.accountId || ""}
      onChange={(e) => {
        const selected = accounts.find(
          (acc) => acc.accountId === e.target.value);
        handleChange(selected);
      }}
    >
      {accounts.map((acc) => (
        <option key={acc.accountId} value={acc.accountId}>
          {`${acc.accountName} (${acc.accountId})`}
        </option>
      ))}
    </select>
  );
};

export default AccountDropdown;
