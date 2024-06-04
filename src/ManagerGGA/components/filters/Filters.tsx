import React from "react";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface FiltersProps {
  headers: string[];
  filters: any;
  updateFilter: (field: any, value: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  headers,
  filters,
  updateFilter,
}) => {
  return (
    <>
      <div>
        {headers.map((header) =>
          header !== "Fecha" ? (
            <TextField
              key={header}
              label={`Filter by ${header}`}
              value={filters[header] || ""}
              onChange={(e) => updateFilter(header, e.target.value)}
              style={{ marginRight: "10px", marginBottom: "10px" }}
            />
          ) : (
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              style={{ marginRight: "10px", marginBottom: "10px" }}
            >
              <DatePicker
                label="Start date"
                value={filters["Fecha"] ? filters["Fecha"][0] : null}
                onChange={(newValue) =>
                  updateFilter("Fecha", [
                    newValue,
                    filters["Fecha"] ? filters["Fecha"][1] : null,
                  ])
                }
              />
              <DatePicker
                label="End date"
                value={filters["Fecha"] ? filters["Fecha"][1] : null}
                onChange={(newValue) =>
                  updateFilter("Fecha", [
                    filters["Fecha"] ? filters["Fecha"][0] : null,
                    newValue,
                  ])
                }
              />
            </LocalizationProvider>
          )
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Exportar
        </Button>
        <Button variant="contained" color="secondary">
          Importar
        </Button>
      </div>
    </>
  );
};
