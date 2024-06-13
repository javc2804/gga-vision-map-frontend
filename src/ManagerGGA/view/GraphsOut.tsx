import { useSelector } from "react-redux";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  Cell,
} from "recharts";
import FiltersGraph from "../components/filters/FiltersGraph";
import useGraphsOut from "../hooks/useGraph";
import { useState } from "react";

const originalConsoleError = console.error;

console.error = (...args) => {
  if (/Warning.*defaultProps/.test(args[0])) {
    return;
  }
  originalConsoleError(...args);
};

const titles = ["spz", "am", "met", "ocm", "blv"];
const colors = [
  "#8884d8",
  "#ff3c79",
  "#ffc658",
  "#00C49F",
  "#00dde9",
  "#00C49F",
  "#FF8042",
];

const GraphsOut = () => {
  const {
    filters,
    dateRange,
    setDateRange,
    onSearch,
    updateFilter,
    clearFilters,
    setFilterValues,
    filterValues,
  } = useGraphsOut();

  const tempData = useSelector((state: any) => state.purchase.graph);

  const transformedData = titles
    .map((title) => {
      const dataForTitle = tempData[title];
      if (!dataForTitle) return null;

      return Object.entries(dataForTitle).map(([rubro, gastos]) => {
        return { name: rubro, gastos, title };
      });
    })
    .filter(Boolean);

  const generalData = Object.entries(tempData.total || {}).map(
    ([name, gastos]) => {
      return { name, gastos };
    }
  );

  const headers = [
    "id",
    "createdAt",
    "facNDE",
    "proveedor",
    "ut",
    "eje",
    "cantidad",
    "formaPago",
    "compromiso",
    "repuesto",
    "descripcionRepuesto",
    "montoTotalUsd",
    "deudaTotalUsd",
    "tasaBcv",
    "ndeAlmacen",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
        height: "85vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center", // Add this line
        }}
      >
        <div style={{ flex: "0 40%" }}>
          <FiltersGraph
            headers={headers}
            filters={filters}
            dateRange={dateRange}
            setDateRange={setDateRange}
            clearFilters={clearFilters}
            updateFilter={updateFilter}
            onSearch={onSearch}
          />
        </div>
        <div style={{ flex: "0 60%" }}>
          <h2 style={{ textAlign: "center", fontSize: "32px" }}>General</h2>
          <ComposedChart
            width={770} // Adjust this value as needed
            height={500}
            data={generalData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: "24px" }} />
            <YAxis tick={{ fontSize: "24px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="gastos">
              {generalData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
            <Label
              value="Mi Gráfico General"
              offset={0}
              position="top"
              style={{ fontSize: "24px" }}
            />
          </ComposedChart>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {transformedData.map((data, i) => (
          <div style={{ flex: "0 1 calc(40% - 10px)", margin: "5px" }} key={i}>
            <h2 style={{ textAlign: "center", fontSize: "32px" }}>
              {data[0].title}
            </h2>
            <ComposedChart
              key={i}
              width={770} // Adjust this value as needed
              height={500} // Adjust this value as needed
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: "24px" }} />
              <YAxis tick={{ fontSize: "24px" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="gastos">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
              <Label
                value={`Mi Gráfico ${i + 2}`}
                offset={0}
                position="top"
                style={{ fontSize: "24px" }}
              />
            </ComposedChart>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: "#ffff", padding: "5px", fontSize: "24px" }}
      >
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default GraphsOut;
