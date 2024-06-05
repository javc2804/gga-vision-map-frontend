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
  const [data, setData] = useState({ count: 0, rows: [] });

  const currentYear = new Date().getFullYear();
  const [dateRange, setDateRange] = useState([
    new Date(currentYear, 0, 1),
    new Date(),
  ]);
  const [offset, setOffset] = useState(0);
  const startDate = new Date(dateRange[0]).toISOString();
  const endDate = new Date(dateRange[1]).toISOString();

  const [dataDate, setDataDate] = useState({
    startDate,
    endDate,
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(startGetListPurchase(dataDate));
      if (result.ok) {
        // Check if response is not null and has a rows property
        if (result.response && Array.isArray(result.response.rows)) {
          setData(result.response); // Update data with the response
        } else {
          console.error("Unexpected response format:", result.response);
          setData({ count: 0, rows: [] }); // Set default data
        }
      }
    };

    fetchData();
  }, [dataDate]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);
    setPage(newPage + 1);
    // setOffset(newPage * rowsPerPage); // Ahora puedes usar setOffset aquí
    setDataDate({ ...dataDate, page: newPage });
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
