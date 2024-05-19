import { CompromiseProvider } from "../NewComprimise/CompromiseProvider";
import CompromiseTotal from "./CompromiseTotal";
import { DataCompromises } from "./DataCompromise/DataCompromises";
interface NewCompromiseProps {
  combinedData: any;
}

export const NewCompromise: React.FC<NewCompromiseProps> = ({
  combinedData,
}) => {
  const { providers, spareParts, sparePartVariants } = combinedData.response;

  return (
    <>
      <CompromiseProvider proveedor={providers} />
      <DataCompromises
        spareParts={spareParts}
        sparePartVariants={sparePartVariants}
      />
      <CompromiseTotal />
    </>
  );
};

export default NewCompromise;
