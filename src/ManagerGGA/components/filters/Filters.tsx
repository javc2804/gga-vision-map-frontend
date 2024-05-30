import React from "react";
import { TextField } from "@mui/material";
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
    <div>
      {headers.map((header) =>
        header !== "Fecha" ? (
          <TextField
            key={header}
            label={`Filter by ${header}`}
            value={filters[header] || ""}
            onChange={(e) => updateFilter(header, e.target.value)}
          />
        ) : (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
  );
};
