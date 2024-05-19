interface NewCompromiseProps {
  combinedData: any;
}

export const NewCompromise: React.FC<NewCompromiseProps> = ({
  combinedData,
}) => {
  console.log(combinedData);

  return <div>NewCompromise</div>;
};

export default NewCompromise;
