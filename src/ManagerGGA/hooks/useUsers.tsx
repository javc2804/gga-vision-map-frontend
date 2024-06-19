import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetUsers } from "../../store/users/usersThunk";

export const useUser = (initialRowsPerPage: number = 5) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const dispatch = useDispatch();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(startGetUsers());
  }, []);

  return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
};
