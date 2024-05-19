import OrdersCompromises from "./OrdersCompromises";
import PricesCompromises from "./PricesCompromises";
import SpartsCompromise from "./SpartsCompromise";

interface CompromiseProviderProps {
  spareParts: any;
  sparePartVariants: any;
}
export const DataCompromises: React.FC<CompromiseProviderProps> = ({
  spareParts,
  sparePartVariants,
}) => {
  return (
    <>
      <SpartsCompromise
        spareParts={spareParts}
        sparePartVariants={sparePartVariants}
      />
      <PricesCompromises />
      <OrdersCompromises />
    </>
  );
};

export default DataCompromises;
