import React, { useCallback } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import {
  startExport,
  startImport,
  startHandleSearch,
  startDownload,
} from "../../../store/purchase/purchaseThunks";

interface FiltersProps {
  headers: string[];
  filters: any;
  dateRange: any;
  setDateRange: any;
  clearFilters: any;
  updateFilter: (field: any, value: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  headers,
  filters,
  dateRange,
  setDateRange,
  updateFilter,
  clearFilters,
}) => {
  const dispatch = useDispatch();

  const handleExport = () => {
    dispatch(startExport(filters, dateRange[0], dateRange[1]));
  };

  const handleDownload = () => {
    dispatch(startDownload());
  };

  const handleSearch = useCallback(
    (page = 0) => {
      dispatch(startHandleSearch(filters, dateRange[0], dateRange[1], page, 5));
    },
    [dispatch, filters, dateRange]
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        await dispatch(startImport(formData));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const modal = useSelector((state: any) => state.purchase.modal);
  // console.log(modal);

  return (
    <>
      {modal ? null : (
        <>
          <div>
            {headers.map((header, index) =>
              header !== "createdAt" ? (
                header !== "formaPago" ? (
                  header !== "deudaTotalUsd" ? (
                    <TextField
                      key={`${header}-${index}`} // Añade un índice a la key
                      label={`Filter by ${header}`}
                      value={filters[header] || ""}
                      onChange={(e) => updateFilter(header, e.target.value)}
                      style={{ marginRight: "10px", marginBottom: "10px" }}
                    />
                  ) : (
                    <div key={`${header}-${index}`}>
                      {" "}
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
                    key={`${header}-${index}`} // Añade un índice a la key
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
                  key={`datePicker-${index}`} // Añade un índice a la key
                  dateAdapter={AdapterDateFns}
                  style={{ marginRight: "10px", marginBottom: "10px" }}
                >
                  <DatePicker
                    label="Fecha inicial"
                    format="dd/MM/yyyy"
                    value={dateRange[0]}
                    onChange={(newValue) =>
                      setDateRange([newValue, dateRange[1]])
                    }
                  />
                  <DatePicker
                    label="Fecha final"
                    format="dd/MM/yyyy"
                    value={dateRange[1]}
                    onChange={(newValue) =>
                      setDateRange([dateRange[0], newValue])
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
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
            onClick={clearFilters}
          >
            Limpiar Filtros
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
              onClick={handleExport}
              style={{
                backgroundColor: "#00dde9",
                color: "#fff",
                marginRight: "1%",
              }}
            >
              Exportar
            </Button>
            <Button
              variant="contained"
              style={{
                marginRight: "1%",
                backgroundColor: "#f5447a",
                color: "#fff",
              }}
              component="label" // Esto permitirá que el botón funcione como un input de tipo "file"
            >
              Importar
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            <Button
              onClick={handleDownload}
              variant="contained"
              color="primary"
              component="label"
            >
              Descargar Plantilla
            </Button>
          </div>
        </>
      )}
    </>
  );
};
