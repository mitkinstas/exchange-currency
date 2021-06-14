import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";

import { Currencies, Store, ExchangeDirection } from "./types";

export const PERSIST_STORE_KEY = "currency-storage";
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
      name: PERSIST_STORE_KEY,
      version: 1,
    }
  )
);
