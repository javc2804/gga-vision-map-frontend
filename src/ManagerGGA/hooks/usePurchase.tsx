import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPurchase } from "../../store/purchase/purchaseSlice";

export const usePurchase = () => {
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [orderDate, setOrderDate] = useState(new Date());
  const [repuestos, setRepuestos] = useState("");
  const [formaDePago, setFormaDePago] = useState("");
  const [ut, setUt] = useState("");

  const dispatch = useDispatch();
  const purchase = useSelector(selectPurchase);

  // useEffect(() => {
  //   if (!purchase) {
  //     dispatch(startGetPurchase());
  //   }
  // }, [dispatch, purchase]);

  const handleSave = useCallback(() => {
    console.log("Guardar clicked");
  }, []);

  const handleClear = useCallback(() => {
    console.log("limpiar clicked");
  }, []);

  return {
    deliveryDate,
    setDeliveryDate,
    paymentDate,
    setPaymentDate,
    orderDate,
    setOrderDate,
    repuestos,
    setRepuestos,
    formaDePago,
    setFormaDePago,
    ut,
    setUt,
    purchase,
    handleSave,
    handleClear,
  };
};
