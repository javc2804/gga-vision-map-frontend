import OrdersCompromises from "./OrdersCompromises";
import PricesCompromises from "./PricesCompromises";
import SpartsCompromise from "./SpartsCompromise";

interface CompromiseProviderProps {
  fleets: any;
  spareParts: any;
  sparePartVariants: any;
}
export const DataCompromises: React.FC<CompromiseProviderProps> = ({
  fleets,
  spareParts,
  sparePartVariants,
}) => {
  console.log(spareParts, fleets, sparePartVariants);
  return (
    <>
      <SpartsCompromise />
      <PricesCompromises />
      <OrdersCompromises />
    </>
  );
};

export default DataCompromises;
