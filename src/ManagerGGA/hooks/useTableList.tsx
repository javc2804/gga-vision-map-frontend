// useTableList.tsx
import { useState, useMemo, useEffect } from "react";
import { startGetListPurchase } from "../../store/purchase/purchaseThunks";
import { useDispatch } from "react-redux";

interface IRow {
  ID: number;
  Fecha: string;
  UT: string;
  Eje: string;
  "Sub-eje": string;
  "NDE(a)": string;
  FacProv: string;
  Proveedor: string;
  Compromiso: string;
  Repuesto: string;
  Cantidad: number;
  "Total Bs": number;
  "Total $": number;
  "Deuda $": number;
  [key: string]: string | number;
}

const useTableList = (initialData: IRow[]) => {
  const dispatch = useDispatch();

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dataDate, setDataDate] = useState({
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    page: 0,
    limit: 5,
    filters: {},
  });

  useEffect(() => {
    setDataDate({
      ...dataDate,
      page,
      limit: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(Math.max(0, newPage + 1)); // Asegúrate de que la página nunca sea menor que 0
    setDataDate({ ...dataDate, page: newPage });
    dispatch(startGetListPurchase({ ...dataDate, page: newPage }));
  };

  const handleSortRequest = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setDataDate({ ...dataDate, limit: newRowsPerPage });
    dispatch(
      startGetListPurchase({ ...dataDate, page: 0, limit: newRowsPerPage })
    );
  };

  const sortedData = useMemo(() => {
    return [...initialData].sort((a: IRow, b: IRow) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [initialData, orderBy, order]);

  return {
    sortedData,
    order,
    orderBy,
    page,
    rowsPerPage,
    handleSortRequest,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default useTableList;
