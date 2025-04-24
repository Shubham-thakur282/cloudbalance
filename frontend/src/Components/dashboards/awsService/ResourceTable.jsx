import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { tableColumns, columnKeyMap } from "./tableConfig";
import "../../../scss/resourceTable.scss";
import { toast } from "react-toastify";

const ResourceTable = ({ service, data }) => {
  const [filters, setFilters] = useState({});
  const [showPopup, setShowPopup] = useState(null);
  const [search, setSearch] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const filteredData = data.filter((item) => {
    return Object.entries(filters).every(([key, values]) => {
      if (values.length === 0) return true;
      return values.includes(item[columnKeyMap[key]]);
    });
  });

  const toggleValue = (col, value) => {
    setFilters((prev) => {
      const current = prev[col] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [col]: updated };
    });
  };

  const uniqueValues = (col) => {
    const values = data.map((d) => d[columnKeyMap[col]]);
    return [...new Set(values.filter(Boolean))];
  };

  return (
    <div className="resource-table">
      <h3>{service} Resources</h3>
      <table>
        <thead>
          <tr className="table-header-row">
            {tableColumns[service].map((col, idx) => (
              <th key={idx} className="column-header">
                <div className="column-header-div">
                  <span>{col}</span>
                  <button
                    onClick={() => setShowPopup(showPopup === col ? null : col)}
                  >
                    &#x25BC;
                  </button>
                  {showPopup === col && (
                    <div className="filter-popup">
                      <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div className="filter-values">
                        {uniqueValues(col)
                          .filter((v) =>
                            v
                              ?.toString()
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                          .map((val, i) => (
                            <div key={i} className="filter-option">
                              <input
                                type="checkbox"
                                checked={filters[col]?.includes(val) || false}
                                onChange={() => toggleValue(col, val)}
                              />
                              <label>{val}</label>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((res, i) => (
              <tr key={i}>
                {tableColumns[service].map((col, idx) => {
                  const value = res[columnKeyMap[col]] ?? "-";
                  const isResourceId = col === "Resource ID";
                  const displayText =
                    typeof value === "string" && value.length > 50
                      ? `${value.slice(0, 50)}...`
                      : value;

                  return (
                    <td
                      key={idx}
                      className="cell"
                      title={typeof value === "string" ? value : ""}
                    >
                      <div className="cell-div">
                        <span className="text-ellipsis">{displayText}</span>
                        {isResourceId && value !== "-" && (
                          <button
                            className="copy-btn"
                            onClick={() => copyToClipboard(value)}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </button>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableColumns[service].length}
                style={{ textAlign: "center", padding: "1rem" }}
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
