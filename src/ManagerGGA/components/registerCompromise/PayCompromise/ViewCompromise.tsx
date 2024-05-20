import SpartsPayCompromise from "./SpartsPayCompromise";

interface ResponseData {
  spareParts: any;
  sparePartVariants: any;
}

interface ViewCompromiseProps {
  combinedData: {
    response: ResponseData;
  };
}

export const ViewCompromise = ({
  combinedData: { response },
}: ViewCompromiseProps) => {
  const { spareParts, sparePartVariants } = response;

  return (
    <>
      <SpartsPayCompromise
        spareParts={spareParts}
        sparePartVariants={sparePartVariants}
      />
    </>
  );
};

export default ViewCompromise;
