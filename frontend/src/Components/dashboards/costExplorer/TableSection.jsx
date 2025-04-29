const TableSection = ({ tableData, selectedColumn }) => {
  console.log(tableData, selectedColumn);
  return (
    <div className="table-section">
      <table>
        <thead>
          <tr>
            <th>Usage Date</th>
            <th>{selectedColumn?.displayName}</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, idx) => {
          const value = row[selectedColumn?.displayName];
          return (
            <tr key={idx}>
              <td>{row?.USAGE_DATE}</td>
              <td>{value === null || value=== undefined ? "Unknown" : value}</td>
              <td>{row?.TOTAL_AMOUNT}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};

export default TableSection;
