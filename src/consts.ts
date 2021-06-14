import { Currencies } from "./types";

export const APP_ID = "cd6c90a665f44a21859604341069c2fa";
export const API_URL = "https://openexchangerates.org/api/latest.json";
export const API_PATH = `${API_URL}?app_id=${APP_ID}`;
export const BASE_CURRENCY = Currencies.USD;
export const REQUEST_REPEAT_TIME = 10000;

export const CURRENCY_OPTIONS = [
  {
    value: Currencies.USD,
    label: "USD",
  },
  {
    value: Currencies.EUR,
    label: "EUR",
  },
  {
    value: Currencies.GBP,
    label: "GBP",
  },
];
