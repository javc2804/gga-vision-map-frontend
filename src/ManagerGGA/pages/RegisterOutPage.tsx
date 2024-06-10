import { useEffect, useState } from "react";
import ManagerGGALayout from "../layout/ManagerGGALayout";
import { RegisterPurchase, RegisterCompromise } from "../view/expenses/index";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

export const RegisterOutPage = () => {
  const { params } = useParams<{ params?: any }>();
  useEffect(() => {
    console.log(params);
  }, [params]);

  const [selectedValue, setSelectedValue] = useState("purchase");

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <ManagerGGALayout>
      <RadioGroup row value={selectedValue} onChange={handleChange}>
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
      </RadioGroup>
      <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
        {JSON.parse(params).compromiso === null ? (
          <RegisterPurchase
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        ) : (
          <RegisterCompromise
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        )}
      </Box>
    </ManagerGGALayout>
  );
};

export default RegisterOutPage;
