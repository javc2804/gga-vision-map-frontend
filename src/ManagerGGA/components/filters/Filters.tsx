import React, { useCallback, useState } from "react";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch } from "react-redux";
import { startGetListPurchase } from "../../../store/purchase/purchaseThunks";

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
  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();
  const [dateRange, setDateRange] = useState([
    new Date(currentYear, 0, 1),
    new Date(),
  ]);

  const startDate = new Date(dateRange[0]).toISOString();
  const endDate = new Date(dateRange[1]).toISOString();

  const handleSearch = useCallback(() => {
    const purchaseData = {
      filters,
      page: 0,
      limit: 5,
      startDate,
      endDate,
    };

    dispatch(startGetListPurchase(purchaseData));
  }, [dispatch, filters]);

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
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
        onClick={handleSearch}
      >
        Buscar
      </Button>
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
