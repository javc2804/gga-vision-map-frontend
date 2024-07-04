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
  LabelList,
} from "recharts";
import FiltersGraph from "../components/filters/FiltersGraph";
import useGraphsOut from "../hooks/useGraph";

interface TooltipProps {
  active?: boolean;
  payload?: { value: string }[];
  label?: string;
}

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
  } = useGraphsOut();

  const tempData = useSelector((state: any) => state.purchase.graph);

  const transformedData = titles
    .map((title) => {
      const dataForTitle = tempData[title];
      if (!dataForTitle) return null;

      return Object.entries(dataForTitle).map(
        ([rubro, { total: gastos, cantidad }]) => {
          return { name: rubro, gastos, cantidad, title };
        }
      );
    })
    .filter(Boolean);
  const generalData = Object.entries(tempData.total || {}).map(
    ([name, { total: gastos, cantidad }]) => {
      return { name, gastos, cantidad };
    }
  );

  const CustomizedLabel = (props: any) => {
    const { x, y, value } = props;
    // Ajusta la posición según sea necesario
    return (
      <text x={x + 45} y={y - 25} fill="#666" textAnchor="middle">
        Cantidad: {value}
      </text>
    );
  };

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
      <button onClick={() => window.print()}>Imprimir gráficos</button>

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
            width={800} // Adjust this value as needed
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
              {generalData &&
                generalData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              <LabelList dataKey="gastos" position="top" />
              <LabelList dataKey="cantidad" content={<CustomizedLabel />} />
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
              {data && data[0].title}
            </h2>
            <ComposedChart
              key={i}
              width={800} // Adjust this value as needed
              height={800} // Adjust this value as needed
              data={data || []}
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
                {generalData &&
                  generalData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                <LabelList dataKey="gastos" position="top" />
                <LabelList dataKey="cantidad" content={<CustomizedLabel />} />
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

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: "#ffff", padding: "5px", fontSize: "24px" }}
      >
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{`Cantidad : ${payload[0].payload.cantidad}`}</p>{" "}
        {/* Add this line */}
      </div>
    );
  }

  return null;
};

export default GraphsOut;

// const GraphsOut = () => {
//   return <div>GraphsOut</div>;
// };

// export default GraphsOut;
