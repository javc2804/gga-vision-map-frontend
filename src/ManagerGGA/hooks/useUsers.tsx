import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startDeleteUser, startGetUsers } from "../../store/users/usersThunk";

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

  const deleteUser = (email: string) => {
    dispatch(startDeleteUser(email));
  };

  useEffect(() => {
    dispatch(startGetUsers());
  }, []);

  return {
    deleteUser,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
