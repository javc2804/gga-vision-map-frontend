interface PayCompromiseProps {
  combinedData: any; // Reemplaza 'any' con el tipo de datos correcto
}

export const PayCompromise: React.FC<PayCompromiseProps> = ({
  combinedData,
}) => {
  // Ahora puedes usar combinedData en tu componente
  // console.log(combinedData);

  return <div>PayCompromise</div>;
};

export default PayCompromise;
