import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetListPurchase } from "../../store/purchase/purchaseThunks";
interface DataType {
  count?: number;
  rows?: any[];
}
export const usePurchaseList = (page: number, limit: number) => {
  const dispatch = useDispatch();

  const [data, setData] = useState<DataType>({ count: 0, rows: [] });
  const currentYear = new Date().getFullYear();
  const [dateRange, setDateRange] = useState([
    new Date(currentYear, 0, 1),
    new Date(),
  ]);

  const startDate = new Date(dateRange[0]).toISOString();
  const endDate = new Date(dateRange[1]).toISOString();

  const dataDate = {
    startDate,
    endDate,
    page,
    limit,
  };

  useEffect(() => {
    dispatch(startGetListPurchase(dataDate));
  }, [dateRange, page, limit]);

  const resp = useSelector((state: any) => state.purchase);
  const purchaseData = resp.purchase;

  useEffect(() => {
    setData(purchaseData);
  }, [purchaseData]);

  const [filters, setFilters] = useState({});
  const updateFilter = (field: any, value: any) => {
    if (field === "Fecha") {
      setDateRange(value);
    } else {
      setFilters({
        ...filters,
        [field]: value,
      });
    }
  };

  let filteredRows: any = [];

  if (data && data.rows && Array.isArray(data.rows)) {
    filteredRows = data.rows.filter((row: any) => {
      const date = new Date(row.createdAt);
      return date >= dateRange[0] && date <= dateRange[1];
    });
  } else {
    console.error("data.rows is not an array:", data);
  }

  const filteredData = filteredRows.filter((row: any) =>
    Object.entries(filters).every(([field, value]) => {
      if (field !== "Fecha") {
        return String(row[field])
          .toLowerCase()
          .includes(String(value).toLowerCase());
      }
      return true;
    })
  );

  return {
    data,
    dateRange,
    filters,
    updateFilter,
    filteredData,
  };
};
