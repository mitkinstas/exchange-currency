export enum Currencies {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export enum ExchangeDirection {
  Direct = "direct",
  Reverse = "reverse",
}

export interface Balance {
  amount: number;
  currency: Currencies;
}

export interface FormState {
  fromCurrency: Currencies;
  toCurrency: Currencies;
  fromAmount: number | "";
  toAmount: number | "";
  direction: ExchangeDirection;
}

export interface Store {
  formState: FormState;
  rates: Record<string, number>;
  balance: Balance[];
  setRates: (rates: Store["rates"]) => void;
  set: (fn: (store: Store) => void) => void;
  setBalance: (
    fromAmount: number | "",
    toAmount: number | "",
    fromCurrency: Currencies,
    toCurrency: Currencies,
    direction: ExchangeDirection
  ) => void;
}
