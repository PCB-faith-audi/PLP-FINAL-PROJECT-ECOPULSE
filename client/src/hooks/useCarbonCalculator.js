import React from "react";

/**
Inputs (any subset):
- electricityKwh (kWh)
- carKm (km) and carType ("petrol" | "diesel" | "hybrid" | "ev")
- fuelLiters (L) and fuelType ("petrol" | "diesel")
- flightsKmShort (km), flightsKmLong (km)
- lpgKg (kg), naturalGasKwh (kWh)
Override factors via options.factors.
*/
const DEFAULT_FACTORS = {
  electricity_kwh: 0.233, // kg CO2e per kWh (global avg; replace with grid-specific if needed)
  car_km: { petrol: 0.192, diesel: 0.171, hybrid: 0.120, ev: 0.060 }, // kg/km
  fuel_liter: { petrol: 2.31, diesel: 2.68 }, // kg/L
  flight_km: { short: 0.254, long: 0.195 }, // kg/km incl. RF approx
  lpg_kg: 3.00, // kg/kg
  gas_kwh: 0.184, // natural gas kg/kWh
};

export function useCarbonCalculator(initial = {}, options = {}) {
  const [inputs, setInputs] = React.useState(initial);
  const factors = { ...DEFAULT_FACTORS, ...(options.factors || {}) };

  const breakdown = React.useMemo(() => {
    const b = [];

    if (Number.isFinite(inputs.electricityKwh)) {
      b.push({ key: "electricity", kg: inputs.electricityKwh * factors.electricity_kwh });
    }
    if (Number.isFinite(inputs.carKm)) {
      const t = inputs.carType || "petrol";
      const ef = factors.car_km[t] ?? factors.car_km.petrol;
      b.push({ key: `car_${t}`, kg: inputs.carKm * ef });
    }
    if (Number.isFinite(inputs.fuelLiters) && inputs.fuelType) {
      const ef = factors.fuel_liter[inputs.fuelType] ?? 0;
      b.push({ key: `fuel_${inputs.fuelType}`, kg: inputs.fuelLiters * ef });
    }
    if (Number.isFinite(inputs.flightsKmShort)) {
      b.push({ key: "flight_short", kg: inputs.flightsKmShort * factors.flight_km.short });
    }
    if (Number.isFinite(inputs.flightsKmLong)) {
      b.push({ key: "flight_long", kg: inputs.flightsKmLong * factors.flight_km.long });
    }
    if (Number.isFinite(inputs.lpgKg)) {
      b.push({ key: "lpg", kg: inputs.lpgKg * factors.lpg_kg });
    }
    if (Number.isFinite(inputs.naturalGasKwh)) {
      b.push({ key: "natural_gas", kg: inputs.naturalGasKwh * factors.gas_kwh });
    }

    return b;
  }, [inputs, factors]);

  const estimateKgCO2e = React.useMemo(
    () => breakdown.reduce((s, x) => s + (Number.isFinite(x.kg) ? x.kg : 0), 0),
    [breakdown]
  );

  return { inputs, setInputs, breakdown, estimateKgCO2e, factors };
}