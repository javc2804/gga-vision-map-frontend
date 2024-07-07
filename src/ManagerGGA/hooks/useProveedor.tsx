import { useDispatch as _useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { startCreatingUser, startEditUser } from "../../store/auth/thunks";
import { useNavigate, useLocation } from "react-router-dom";
import { startCreatingProveedor } from "../../store/providersOut/providersThunk";

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
  //   const editUser = async (proveedorDetails: {
  //     email: string;
  //     password: string;
  //     name: string;
  //     lastName: string;
  //     role: string;
  //   }) => {
  //     try {
  //       await formSchema.validate(proveedorDetails, { abortEarly: false });
  //       const response = await dispatch(startEditUser(proveedorDetails));

  //       if (response.wasSuccessful) {
  //         return { wasSuccessful: true, errors: {} };
  //       }
  //     } catch (error: any) {
  //       const errors = error.inner.reduce(
  //         (acc: any, curr: any) => ({ ...acc, [curr.path]: curr.message }),
  //         {}
  //       );
  //       return { wasSuccessful: false, errors };
  //     }
  //   };

  return { createProveedor };
};
