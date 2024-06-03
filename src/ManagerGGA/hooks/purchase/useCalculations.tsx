import { useCallback } from "react";

export const useCalculations = () => {
  const calculatePrecioUnitarioUsd = useCallback(
    (precioUnitarioBs: number, tasaBcv: number) => {
      if (precioUnitarioBs === 0 || tasaBcv === 0 || !tasaBcv) {
        return 0;
      }
      if (!isNaN(precioUnitarioBs) && !isNaN(tasaBcv) && tasaBcv !== 0) {
        const result = precioUnitarioBs / tasaBcv;
        return Number(result.toFixed(2)); // round to 2 decimal places and convert to number
      }

      return 0;
    },
    []
  );

  const calculatePrecioUnitarioBs = useCallback(
    (montoTotalBs: number, cantidad: number) => {
      if (isNaN(montoTotalBs) || isNaN(cantidad) || cantidad === 0) {
        return 0;
      }
      return Number((montoTotalBs / cantidad).toFixed(2));
    },
    []
  );

  const calculateMontoTotalBs = useCallback(
    (cantidad: number, precioUnitarioBs: number) => {
      console.log("pas");
      console.log(cantidad);
      if (cantidad === 0) {
        return 0;
      }

      if (!isNaN(cantidad) && !isNaN(precioUnitarioBs)) {
        const result = cantidad * precioUnitarioBs;
        console.log(result);
        return Number(result.toFixed(2)); // round to 2 decimal places and convert to number
      }
      return 0; // return 0 instead of empty string
    },
    []
  );

  const calculateMontoTotalUsd = useCallback(
    (cantidad: number, precioUnitarioUsd: number) => {
      console.log("USD");
      console.log(cantidad);
      if (cantidad === 0) {
        return 0;
      }
      if (!isNaN(cantidad) && !isNaN(precioUnitarioUsd)) {
        const result = cantidad * precioUnitarioUsd;
        console.log(result);

        return Number(result.toFixed(2)); // round to 2 decimal places and convert to number
      }

      return 0;
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

      return Number((precioUnitarioBs / precioUnitarioUsd).toFixed(2));
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
