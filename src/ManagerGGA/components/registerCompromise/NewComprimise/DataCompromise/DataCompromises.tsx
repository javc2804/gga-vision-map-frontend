import { Paper, Button } from "@mui/material";
import { useState } from "react";
import SpartsCompromise from "./SpartsCompromise";
import PricesCompromises from "./PricesCompromises";

interface CompromiseProviderProps {
  spareParts: any;
  sparePartVariants: any;
}

export const DataCompromises: React.FC<CompromiseProviderProps> = ({
  spareParts,
  sparePartVariants,
}) => {
  const [papers, setPapers] = useState([{ id: Math.random() }]);

  const addPaper = () => {
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
          <PricesCompromises />
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
