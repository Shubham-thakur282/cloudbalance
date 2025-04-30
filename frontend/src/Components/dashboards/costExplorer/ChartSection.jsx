import ReactFC from "react-fusioncharts";

const formatMultiSeriesChartData = ({
  data,
  labelKey,
  dateKey = "USAGE_DATE",
  valueKey = "TOTAL_AMOUNT",
}) => {
  const groupedByLabel = {};
  const uniqueDates = new Set();

  data.forEach((item) => {
    const label = item[labelKey] ?? "Unknown";
    const date = item[dateKey];
    uniqueDates.add(date);
    if (!groupedByLabel[label]) {
      groupedByLabel[label] = {};
    }
    groupedByLabel[label][date] = parseFloat(item[valueKey] || 0);
  });

  const sortedDates = Array.from(uniqueDates).sort();

  const categories = [
    {
      category: sortedDates.map((date) => ({ label: date })),
    },
  ];

  const dataset = Object.entries(groupedByLabel).map(([label, valuesByDate]) => ({
    seriesname: label,
    data: sortedDates.map((date) => ({
      value: valuesByDate[date]?.toFixed(2) || "0.00",
    })),
  }));

  return { categories, dataset };
};

const ChartSection = ({ chartData, selectedColumn }) => {
  const { categories, dataset } = formatMultiSeriesChartData({
    data: chartData,
    labelKey: selectedColumn.displayName,
  });

  return (
    <div className="chart-section">
      <ReactFC
        type="mscolumn2d"
        width="100%"
        height="450"
        dataFormat="json"
        dataSource={{
          chart: {
            caption: `Monthly Costs by ${selectedColumn.displayName}`,
            xAxisName: "Date",
            yAxisName: "Total Amount",
            rotateYAxisName:"1",
            numberPrefix: "$",
            theme: "fusion",
            formatNumberScale: "0",
            showValues: "0",
            legendPosition: "bottom",
            drawCrossLine: "1",
          },
          categories,
          dataset,
        }}
      />
    </div>
  );
};

export default ChartSection;
