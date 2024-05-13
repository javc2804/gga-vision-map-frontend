import React, { useState } from "react";
import ManagerGGALayout from "../layout/ManagerGGALayout";
import { RegisterPurchase, RegisterCompromise } from "../view/expenses/index";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export const RegisterOutPage = () => {
  const [purchaseForms, setPurchaseForms] = useState([{}]);
  const [compromiseForms, setCompromiseForms] = useState([
    {
      /* initial form state */
    },
  ]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setPurchaseForms([
      {
        /* initial form state */
      },
    ]);
    setCompromiseForms([
      {
        /* initial form state */
      },
    ]);
  };

  const handleAddClick = () => {
    if (selectedValue === "purchase") {
      setPurchaseForms([
        ...purchaseForms,
        {
          /* initial form state */
        },
      ]);
    } else {
      setCompromiseForms([
        ...compromiseForms,
        {
          /* initial form state */
        },
      ]);
    }
  };

  const handleRemoveClick = () => {
    if (selectedValue === "purchase" && purchaseForms.length > 1) {
      setPurchaseForms(purchaseForms.slice(0, -1));
    } else if (selectedValue === "compromise" && compromiseForms.length > 1) {
      setCompromiseForms(compromiseForms.slice(0, -1));
    }
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleSaveClick = () => {
    if (selectedValue === "purchase") {
      console.log(purchaseForms);
    } else {
      console.log(compromiseForms);
    }
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
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)", // Adjust as needed
        }}
      >
        {(selectedValue === "purchase" ? purchaseForms : compromiseForms).map(
          (form, index) => (
            <div key={index}>
              {selectedValue === "purchase" ? (
                <RegisterPurchase
                  value={form}
                  onChange={(newForm) => {
                    const newForms = [...purchaseForms];
                    newForms[index] = newForm;
                    setPurchaseForms(newForms);
                  }}
                />
              ) : (
                <RegisterCompromise
                  value={form}
                  onChange={(newForm) => {
                    const newForms = [...compromiseForms];
                    newForms[index] = newForm;
                    setCompromiseForms(newForms);
                  }}
                />
              )}
              {index <
                (selectedValue === "purchase" ? purchaseForms : compromiseForms)
                  .length -
                  1 && <Divider />}
            </div>
          )
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Agregar
      </Button>
      {(selectedValue === "purchase" ? purchaseForms : compromiseForms).length >
        1 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemoveClick}
        >
          Borrar
        </Button>
      )}
      <Button variant="contained" color="success" onClick={handleSaveClick}>
        Guardar
      </Button>
    </ManagerGGALayout>
  );
};

export default RegisterOutPage;
