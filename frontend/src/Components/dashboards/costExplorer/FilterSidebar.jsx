import { useState } from "react";
import { getFilters } from "../../../service/costExplorerApi";

const FilterSidebar = ({
  filters,
  columns,
  handleFilterChange,
  applyFilters,
  resetFilters,
  setShowSidebar,
}) => {
  const [filterValues, setFilterValues] = useState({}); // { displayName: [value1, value2] }
  const [expanded, setExpanded] = useState({}); // { displayName: true/false }

  const toggleFilter = async (displayName) => {
    const isExpanded = expanded[displayName];
    setExpanded({ ...expanded, [displayName]: !isExpanded });

    if (!isExpanded && !filterValues[displayName]) {
      try {
        const response = await getFilters(displayName);
        setFilterValues({
          ...filterValues,
          [displayName]: response?.data, // assume API returns array of values
        });
      } catch (err) {
        console.error("Error fetching filter values:", err);
      }
    }
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>
      {columns.map((column, index) => (
        <div key={index} className="filter-block">
          <div
            className="filter-title"
            onClick={() => toggleFilter(column.displayName)}
            style={{ cursor: "pointer" }}
          >
            {column.displayName}
          </div>

          {expanded[column.displayName] &&
            (filterValues[column.displayName]?.length > 0 ? (
              <div className="filter-options">
                {filterValues[column.displayName].map((val, i) => (
                  <div className="filter-values" key={i}>
                    <label>
                      {val}
                      <input
                        type="checkbox"
                        checked={
                          filters[column.displayName]?.includes(val) || false
                        }
                        onChange={(e) =>
                          handleFilterChange(
                            column.displayName,
                            val,
                            e.target.checked
                          )
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            ))}
        </div>
      ))}

      <div className="sidebar-actions">
        <button
          onClick={(e) => {
            e.preventDefault();
            applyFilters();
          }}
        >
          Apply
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            resetFilters();
          }}
        >
          Reset
        </button>
        <button onClick={() => setShowSidebar(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default FilterSidebar;
