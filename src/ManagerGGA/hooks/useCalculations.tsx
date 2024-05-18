import { useCallback } from "react";

export const useCalculations = () => {
  const calculatePrecioUnitarioUsd = useCallback(
    (precioUnitarioBs: string, tasaBcv: string) => {
      const precioBs = parseFloat(precioUnitarioBs);
      const tasa = parseFloat(tasaBcv);

      if (!isNaN(precioBs) && !isNaN(tasa) && tasa !== 0) {
        const result = precioBs / tasa;
        return result.toFixed(2); // round to 2 decimal places
      }

      return "";
    },
    []
  );

  const calculatePrecioUnitarioBs = useCallback(
    (montoTotalBs: number, cantidad: number) => {
      if (isNaN(montoTotalBs) || isNaN(cantidad) || cantidad === 0) {
        return 0;
      }
      return (montoTotalBs / cantidad).toFixed(2);
    },
    []
  );

  const calculateMontoTotalBs = useCallback(
    (cantidad: string, precioUnitarioBs: string) => {
      const cantidadNum = parseFloat(cantidad);
      const precioBs = parseFloat(precioUnitarioBs);

      if (!isNaN(cantidadNum) && !isNaN(precioBs)) {
        const result = cantidadNum * precioBs;
        return result.toFixed(2); // round to 2 decimal places
      }

      return "";
    },
    []
  );

  const calculateMontoTotalUsd = useCallback(
    (cantidad: string, precioUnitarioUsd: string) => {
      const cantidadNum = parseFloat(cantidad);
      const precioUsd = parseFloat(precioUnitarioUsd);

      if (!isNaN(cantidadNum) && !isNaN(precioUsd)) {
        const result = cantidadNum * precioUsd;
        return result.toFixed(2); // round to 2 decimal places
      }

      return "";
    },
    []
  );

  const calculateTasaBcv = useCallback(
    (precioUnitarioBs: number, precioUnitarioUsd: number) => {
      const epsilon = 0.0001; // or some small value
      if (
        isNaN(precioUnitarioBs) ||
        isNaN(precioUnitarioUsd) ||
        Math.abs(precioUnitarioUsd) < epsilon
      ) {
        return 0;
      }

      return (precioUnitarioBs / precioUnitarioUsd).toFixed(2);
    },
    []
  );

  return {
    calculatePrecioUnitarioUsd,
    calculatePrecioUnitarioBs,
    calculateMontoTotalBs,
    calculateMontoTotalUsd,
    calculateTasaBcv,
  };
};
