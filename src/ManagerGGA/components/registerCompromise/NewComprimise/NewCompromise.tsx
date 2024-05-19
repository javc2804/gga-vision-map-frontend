import { CompromiseProvider } from "../NewComprimise/CompromiseProvider";
interface NewCompromiseProps {
  combinedData: any;
}

export const NewCompromise: React.FC<NewCompromiseProps> = ({
  combinedData,
}) => {
  // console.log(combinedData);
  const { providers, fleets, spareParts, sparePartVariants } =
    combinedData.response;

  return (
    <>
      <CompromiseProvider proveedor={providers} />
    </>
  );
};

export default NewCompromise;
