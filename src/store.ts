import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";

export enum Currencies {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export enum ExchangeDirection {
  Direct = "direct",
  Reverse = "reverse",
}

interface Balance {
  amount: number;
  currency: Currencies;
}

interface FormState {
  fromCurrency: Currencies;
  toCurrency: Currencies;
  fromAmount: number | "";
  toAmount: number | "";
  direction: ExchangeDirection;
}

interface Transaction {
  fromCurrency: Currencies;
  toCurrency: Currencies;
  fromAmount: number | "";
  toAmount: number | "";
  direction: ExchangeDirection;
  date: string;
}

export interface Store {
  formState: FormState;
  rates: Record<string, number>;
  balance: Balance[];
  setRates: (rates: Store["rates"]) => void;
  set: (fn: (s: Store) => void) => void;
  setBalance: (
    fromAmount: number | "",
    toAmount: number | "",
    fromCurrency: Currencies,
    toCurrency: Currencies,
    direction: ExchangeDirection
  ) => void;
  transactions: Transaction[];
}

export const INITIAL_BALANCE = [
  {
    currency: Currencies.EUR,
    amount: 100,
  },
  {
    currency: Currencies.USD,
    amount: 25,
  },
  {
    currency: Currencies.GBP,
    amount: 10,
  },
];

export const useStore = create<Store>(
  persist(
    (set) => ({
      transactions: [],
      formState: {
        fromCurrency: Currencies.USD,
        toCurrency: Currencies.EUR,
        fromAmount: "",
        toAmount: "",
        direction: ExchangeDirection.Direct,
      },
      rates: {},
      set: (fn) => set(produce(fn)),
      balance: INITIAL_BALANCE,
      setRates: (rates) => set(() => ({ rates })),
      setBalance: (fromAmount, toAmount, fromCurrency, toCurrency, direction) =>
        set((state) => ({
          formState: {
            ...state.formState,
            fromAmount: "",
            toAmount: "",
          },
          transactions: [
            ...state.transactions,
            {
              direction,
              fromCurrency,
              toCurrency,
              fromAmount,
              toAmount,
              date: new Date().toISOString(),
            },
          ],
          balance: state.balance.map((balance) => {
            const isDirect = direction === ExchangeDirection.Direct;

            if (balance.currency === fromCurrency) {
              return {
                ...balance,
                amount: isDirect
                  ? balance.amount - (fromAmount || 0)
                  : balance.amount + (fromAmount || 0),
              };
            }
            if (balance.currency === toCurrency) {
              return {
                ...balance,
                amount: isDirect
                  ? balance.amount + (toAmount || 0)
                  : balance.amount - (toAmount || 0),
              };
            }

            return balance;
          }),
        })),
    }),
    {
      name: "currency-storage",
      version: 1,
    }
  )
);
