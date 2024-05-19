interface CompromiseProviderProps {
  spareParts: any;
  sparePartVariants: any;
}
export const SpartsCompromise: React.FC<CompromiseProviderProps> = ({
  spareParts,
  sparePartVariants,
}) => {
  console.log(spareParts, sparePartVariants);
  return <div>SpartsCompromise</div>;
};

export default SpartsCompromise;
