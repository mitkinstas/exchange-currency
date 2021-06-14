import { Currencies, Store } from "./types";
import { BASE_CURRENCY } from "./consts";

export const getConvertRate = (
  from: Currencies,
  to: Currencies,
  rates: Store["rates"]
) => {
  let convertRate = 1;
  switch (true) {
    case from === BASE_CURRENCY:
      convertRate = rates[to];
      break;
    case to === BASE_CURRENCY:
      convertRate = 1 / rates[from];
      break;
    default:
      convertRate = rates[to] * (1 / rates[from]);
  }

  return convertRate;
};

export const convertSum = (
  amount: number,
  from: Currencies,
  to: Currencies,
  rates?: Store["rates"]
) => {
  if (!from || !to || !amount || !rates) {
    return undefined;
  }

  const convertRate = getConvertRate(from, to, rates);
  return Number((amount * convertRate).toFixed(2));
};
