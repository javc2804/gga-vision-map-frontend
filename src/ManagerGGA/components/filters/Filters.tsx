import React, { useCallback, useState } from "react";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch } from "react-redux";
import {
  startGetListPurchase,
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
