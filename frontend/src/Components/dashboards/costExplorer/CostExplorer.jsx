import { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import TopControls from "./TopControls";
import ChartSection from "./ChartSection";
import FilterSidebar from "./FilterSidebar";
import TableSection from "./TableSection";
import { getAccounts } from "../../../service/accountsApi";
import { toast } from "react-toastify";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { getData, getGroupByColumns } from "../../../service/costExplorerApi";
import Loader from "../../common/Loader";
import "../../../scss/costExplorer.scss";
import { isEmptyObject } from "../../../utils";

charts(FusionCharts);

const CostExplorer = () => {
  const [selectedAccount, setSelectedAccount] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState({});
  const [columns, setColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [moreColumns, setMoreColumns] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState({});
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const res = await getAccounts();
        setAccounts(res?.data || []);
        setSelectedAccount(res?.data?.[0] || null);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching accounts!");
        setIsLoading(false);
      }
    };

    const fetchColumnDetails = async () => {
      try {
        const res = await getGroupByColumns();
        setColumns(res?.data || []);
        setSelectedColumn(res?.data?.[0] || null);
        setVisibleColumns(res?.data.slice(0, 7));
        setMoreColumns(res?.data.slice(7));
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching Groups!");
        setIsLoading(false);
      }
    };

    fetchColumnDetails();
    fetchAccountDetails();
  }, []);

  useEffect(() => {
    if (!isEmptyObject(selectedAccount) && !isEmptyObject(selectedColumn)) {
      fetchChartData();
    }
  }, [selectedAccount, selectedColumn]);

  const fetchChartData = async () => {
    try {
      setIsDataLoading(true);
      const payload = {
        accountId: selectedAccount?.accountId,
        groupBy: selectedColumn?.displayName,
        filters: filters,
      };
      const res = await getData(payload);
      setChartData(res?.data?.chartData);
      setTableData(res?.data?.data);
      setIsDataLoading(false);
    } catch (error) {
      toast.error(error?.response?.data);
      console.log(error);
    }
  };

  const handleMoreColumnSelect = (columnId) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column) return;

    const newVisible = [column, ...visibleColumns.slice(0, 6)];
    const newMore = columns.filter((col) => !newVisible.includes(col));
    setVisibleColumns(newVisible);
    setMoreColumns(newMore);
    setSelectedColumn(column);
  };

  const handleFilterChange = (key, value, checked) => {
    setFilters((prev) => {
      const currentValues = prev[key] || [];

      let updatedValues;
      if (checked) {
        updatedValues = [...currentValues, value];
      } else {
        updatedValues = currentValues.filter((v) => v !== value);
      }

      return {
        ...prev,
        [key]: updatedValues,
      };
    });
  };

  const applyFilters = () => {
    fetchChartData();
  };

  const resetFilters = () => {
    setFilters({});
    if(isEmptyObject(filters))
      fetchChartData();
  };


  return (
    <div className="cost-explorer-container">
      <div className="header-box">
        <h2 className="title">Cost Explorer</h2>
        <div className="underline" />
      </div>
      {!isLoading ? (
        <div className="bottom">
          <TopControls
            visibleColumns={visibleColumns}
            moreColumns={moreColumns}
            handleMoreColumnSelect={handleMoreColumnSelect}
            accounts={accounts}
            selectedAccount={selectedAccount}
            columns={columns}
            setSelectedAccount={setSelectedAccount}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
          />
          <div className="cost-explorer-main-wrapper">
            <div className={`cost-explorer-main ${showSidebar && "less"} `}>
              <div className="chart-div">
                <div className="filter-btn">
                  <button onClick={() => setShowSidebar(!showSidebar)}>
                    <MenuOpenIcon />
                  </button>
                </div>
                {isDataLoading ? (
                  <Loader />
                ) : (
                  <ChartSection
                    chartData={chartData}
                    selectedColumn={selectedColumn}
                  />
                )}
              </div>
              <div className="table-div">
                {isDataLoading ? (
                  <Loader />
                ) : (
                  <TableSection
                    tableData={tableData}
                    selectedColumn={selectedColumn}
                  />
                )}
              </div>
            </div>

            {showSidebar && (
              <div className="filter-sidebar-wrapper">
                <FilterSidebar
                  filters={filters}
                  columns={columns}
                  handleFilterChange={handleFilterChange}
                  applyFilters={applyFilters}
                  resetFilters={resetFilters}
                  setShowSidebar={setShowSidebar}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default CostExplorer;
