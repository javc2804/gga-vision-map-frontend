import { TextField, Select, MenuItem, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface FiltersGraphProps {
  headers: string[];
  filters: any;
  dateRange: any;
  setDateRange: any;
  clearFilters: any;
  updateFilter: (field: any, value: any) => void;
  onSearch: () => void;
}

const FiltersGraph: React.FC<FiltersGraphProps> = ({
  headers,
  filters,
  updateFilter,
  dateRange,
  setDateRange,
  onSearch,
}) => {
  return (
    <div>
      {headers.map((header: any, index) =>
        header !== "createdAt" ? (
          header !== "formaPago" ? (
            header !== "deudaTotalUsd" ? (
              <TextField
                key={`${header}-${index}`}
                label={`Filter by ${header}`}
                value={filters[header] || ""}
                onChange={(e) => updateFilter(header, e.target.value)}
                style={{ marginRight: "10px", marginBottom: "10px" }}
              />
            ) : (
              <div key={`${header}-${index}`}>
                <TextField
                  key={`${header}Min`}
                  label={`Deuda mínima`}
                  value={filters[header]?.min || ""}
                  onChange={(e) =>
                    updateFilter(header, {
                      ...filters[header],
                      min: e.target.value,
                    })
                  }
                  style={{ marginRight: "10px", marginBottom: "10px" }}
                />
                <TextField
                  key={`${header}Max`}
                  label={`Deuda máxima`}
                  value={filters[header]?.max || ""}
                  onChange={(e) =>
                    updateFilter(header, {
                      ...filters[header],
                      max: e.target.value,
                    })
                  }
                  style={{ marginRight: "10px", marginBottom: "10px" }}
                />
              </div>
            )
          ) : (
            <Select
              key={`${header}-${index}`}
              label="Forma de Pago"
              value={filters[header] || ""}
              onChange={(e) => updateFilter(header, e.target.value)}
              style={{ marginRight: "10px", marginBottom: "10px" }}
            >
              <MenuItem value="credito">Crédito</MenuItem>
              <MenuItem value="contado">Contado</MenuItem>
            </Select>
          )
        ) : (
          <LocalizationProvider
            key={`datePicker-${index}`}
            dateAdapter={AdapterDateFns}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          >
            <DatePicker
              label="Fecha inicial"
              format="dd/MM/yyyy"
              value={dateRange[0]}
              onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
            />
            <DatePicker
              label="Fecha final"
              format="dd/MM/yyyy"
              value={dateRange[1]}
              onChange={(newValue) => setDateRange([dateRange[0], newValue])}
            />
          </LocalizationProvider>
        )
      )}
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
        onClick={onSearch}
      >
        Buscar
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
      >
        Limpiar Filtros
      </Button>
    </div>
  );
};

export default FiltersGraph;
