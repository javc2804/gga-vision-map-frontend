import DatosPayCompromise from "./DatosPayCompromise";
import TotalPayCompromise from "./TotalPayCompromise";
import ViewCompromise from "./ViewCompromise";

interface PayCompromiseProps {
  combinedData: any;
}

export const PayCompromise: React.FC<PayCompromiseProps> = ({
  combinedData,
}) => {
  return (
    <>
      <ViewCompromise combinedData={combinedData} />
      <DatosPayCompromise combinedData={combinedData} />
      <TotalPayCompromise />
    </>
  );
};

export default PayCompromise;
