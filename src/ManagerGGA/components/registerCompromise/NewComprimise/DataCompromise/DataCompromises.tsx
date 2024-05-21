import { Paper, Button } from "@mui/material";
import { useState } from "react";
import SpartsCompromise from "./SpartsCompromise";
import PricesCompromises from "./PricesCompromises";
import { addCompromise } from "../../../../../store/compromises/newCompromisesSlices";
import { useDispatch } from "react-redux";
interface CompromiseProviderProps {
  spareParts: any;
  sparePartVariants: any;
}

export const DataCompromises: React.FC<CompromiseProviderProps> = ({
  spareParts,
  sparePartVariants,
}) => {
  const dispatch = useDispatch();

  const [papers, setPapers] = useState([{ id: Math.random() }]);
  const [formState, setFormState] = useState({
    quantity: "",
    price: "",
    total: "",
    description: "",
    orderNumber: "",
    date: "",
    observation: "",
  });
  const [pricesCompromisesState, setPricesCompromisesState] = useState({
    quantity: "",
    price: "",
    total: "",
    description: "",
    orderNumber: "",
    date: "",
    observation: "",
  });

  const addPaper = () => {
    const newCompromise = {
      ...formState,
      ...pricesCompromisesState,
      date: pricesCompromisesState.date
        ? new Date(pricesCompromisesState.date).toISOString()
        : "",
    };

    dispatch(addCompromise(newCompromise));
    setPapers((prev) => [...prev, { id: Math.random() }]);
  };

  const removePaper = (id: number) => {
    setPapers((prev) => prev.filter((paper) => paper.id !== id));
  };

  return (
    <>
      {papers.map((paper) => (
        <Paper
          key={paper.id}
          style={{
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <SpartsCompromise
            spareParts={spareParts}
            sparePartVariants={sparePartVariants}
          />
          <PricesCompromises
            pricesCompromisesState={pricesCompromisesState}
            setPricesCompromisesState={setPricesCompromisesState}
          />
          <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
            {paper === papers[papers.length - 1] && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={addPaper}
              >
                Agregar
              </Button>
            )}
            {papers.length > 1 && (
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => removePaper(paper.id)}
              >
                Borrar
              </Button>
            )}
          </div>
        </Paper>
      ))}
    </>
  );
};

export default DataCompromises;
