import React, { useCallback } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch } from "react-redux";
import {
  startExport,
  startHandleSearch,
} from "../../../store/purchase/purchaseThunks";

interface FiltersProps {
  headers: string[];
  filters: any;
  dateRange: any;
  setDateRange: any;
  updateFilter: (field: any, value: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  headers,
  filters,
  dateRange,
  setDateRange,
  updateFilter,
}) => {
  const dispatch = useDispatch();

  const handleExport = () => {
    console.log(filters, dateRange[0], dateRange[1]);
    dispatch(startExport(filters, dateRange[0], dateRange[1]));
  };

  const handleSearch = useCallback(
    (page = 0) => {
      dispatch(startHandleSearch(filters, dateRange[0], dateRange[1], page, 5));
    },
    [dispatch, filters, dateRange]
  );

  return (
    <>
      <div>
        {headers.map((header) =>
          header !== "createdAt" ? (
            header !== "formaPago" ? (
              header !== "deudaTotalUsd" ? (
                <TextField
                  key={header}
                  label={`Filter by ${header}`}
                  value={filters[header] || ""}
                  onChange={(e) => updateFilter(header, e.target.value)}
                  style={{ marginRight: "10px", marginBottom: "10px" }}
                />
              ) : (
                <>
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
                </>
              )
            ) : (
              <Select
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
          onClick={handleExport}
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
