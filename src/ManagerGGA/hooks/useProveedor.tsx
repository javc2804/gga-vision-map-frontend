import { useDispatch as _useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { startCreatingUser, startEditUser } from "../../store/auth/thunks";
import { useNavigate, useLocation } from "react-router-dom";
import {
  startCreatingProveedor,
  startEditProveedor,
} from "../../store/providersOut/providersThunk";

export const useProveedor = () => {
  const useDispatch = () => _useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const createProveedor = async (proveedorDetails: { name: string }) => {
    try {
      const response = await dispatch(startCreatingProveedor(proveedorDetails));
      console.log(response);
      if (response.wasSuccessful) {
        return { wasSuccessful: true, errors: {} };
      }
    } catch (error: any) {
      return { wasSuccessful: false, error };
    }
  };
  const editProvider = async (proveedorDetails: { name: string }) => {
    try {
      const response = await dispatch(startEditProveedor(proveedorDetails));

      if (response.wasSuccessful) {
        return { wasSuccessful: true, errors: {} };
      }
    } catch (error: any) {
      return { wasSuccessful: false, error };
    }
  };

  return { createProveedor, editProvider };
};
