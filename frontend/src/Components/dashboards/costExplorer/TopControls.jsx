import AccountDropdown from "../../common/AccountDropdown";

const TopControls = ({
  visibleColumns, moreColumns, handleMoreColumnSelect,
  accounts, selectedAccount, setSelectedAccount,
  selectedColumn, setSelectedColumn
}) => {
  return (
    <div className="top-row">
      <div className="columns-display">
        {visibleColumns.map(col => (
          <span 
          key={col?.id} 
          className={`column-item ${col.id === selectedColumn.id ? 'selected' : ''}`}
          onClick={()=>setSelectedColumn(col)}
          >
            {col?.displayName}
            </span>
        ))}
        {moreColumns.length > 0 && (
          <select onChange={e => handleMoreColumnSelect(Number(e.target.value))}>
          <option>More...</option>
          {moreColumns.map(col => (
            <option key={col.id} value={col.id}>{col.displayName}</option>
          ))}
        </select>
        
        )}
      </div>

      <div className="controls">
        <AccountDropdown
          accounts={accounts}
          selectedAccount={selectedAccount}
          handleChange={setSelectedAccount}
        />
      </div>
    </div>
  );
};

export default TopControls;
