import { useEffect, useState } from "react";
import ManagerGGALayout from "../layout/ManagerGGALayout";
import { RegisterPurchase, RegisterCompromise } from "../view/expenses/index";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export const RegisterOutPage = () => {
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);
  const compromiso = editPurchase ? editPurchase.compromiso : null;
  const [selectedValue, setSelectedValue] = useState(() => {
    if (editPurchase && Object.keys(editPurchase).length !== 0) {
      return compromiso ? "compromise" : "purchase";
    }
    return "purchase";
  });

  useEffect(() => {
    // console.log(editPurchase);
  }, [editPurchase]);

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <ManagerGGALayout>
      <RadioGroup row value={selectedValue} onChange={handleChange}>
        {editPurchase &&
        Object.keys(editPurchase).length !== 0 &&
        !compromiso ? (
          <FormControlLabel
            value="purchase"
            control={<Radio />}
            label={
              <Typography variant="h6" color="textPrimary" fontWeight="800">
                Editar Compra
              </Typography>
            }
          />
        ) : editPurchase && compromiso ? (
          <FormControlLabel
            value="compromise"
            control={<Radio />}
            label={
              <Typography variant="h6" color="textPrimary" fontWeight="800">
                Editar Compromiso
              </Typography>
            }
          />
        ) : (
          <>
            <FormControlLabel
              value="purchase"
              control={<Radio />}
              label={
                <Typography variant="h6" color="textPrimary" fontWeight="800">
                  Registrar Compra
                </Typography>
              }
            />
            <FormControlLabel
              value="compromise"
              control={<Radio />}
              label={
                <Typography variant="h6" color="textPrimary" fontWeight="800">
                  Registrar Compromiso
                </Typography>
              }
            />
          </>
        )}
      </RadioGroup>
      <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
        {(() => {
          if (editPurchase && Object.keys(editPurchase).length !== 0) {
            return compromiso === null ? (
              <RegisterPurchase
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                params={editPurchase}
              />
            ) : (
              <RegisterCompromise
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                params={editPurchase}
              />
            );
          } else {
            return selectedValue === "purchase" ? (
              <RegisterPurchase
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                params={{}}
              />
            ) : (
              <RegisterCompromise
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
            );
          }
        })()}
      </Box>
    </ManagerGGALayout>
  );
};

export default RegisterOutPage;
