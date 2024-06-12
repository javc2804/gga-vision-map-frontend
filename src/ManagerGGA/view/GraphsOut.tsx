import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  Line,
} from "recharts";
import { Cell } from "recharts";

const data = [
  { name: "Cauchos", gastos: 5000 },
  { name: "Baterias", gastos: 4000 },
  { name: "Lubricantes", gastos: 2000 },
  { name: "Repuestos", gastos: 2780 },
  { name: "Servicios", gastos: 1890 },
  { name: "Preventivos", gastos: 2390 },
];

const originalConsoleError = console.error;

console.error = (...args) => {
  if (/Warning.*defaultProps/.test(args[0])) {
    return;
  }
  originalConsoleError(...args);
};

const colors = {
  Cauchos: "#f5447a",
  Baterias: "#17dbeb",
  Lubricantes: "#f5a442",
  Repuestos: "#42f56c",
  Servicios: "#6c42f5",
  Preventivos: "#f54242",
};

const titles = ["SPZ", "AM", "MET", "OCM", "BLV"];

const GraphsOut = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        height: "90vh",
      }}
    >
      <h2 style={{ textAlign: "center" }}>General</h2>
      <ComposedChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gastos">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[entry.name]} />
          ))}
        </Bar>
        <Line type="monotone" dataKey="gastos" stroke="#17dbeb" />
        <Label value="Mi Gráfico 1" offset={0} position="top" />
      </ComposedChart>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          width: "100%",
        }}
      >
        {titles.map((title, i) => (
          <div>
            <h2 style={{ textAlign: "center" }}>{title}</h2>
            <ComposedChart
              key={i}
              width={800}
              height={400}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="gastos">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                ))}
              </Bar>
              <Line type="monotone" dataKey="gastos" stroke="#17dbeb" />
              <Label value={`Mi Gráfico ${i + 2}`} offset={0} position="top" />
            </ComposedChart>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphsOut;
