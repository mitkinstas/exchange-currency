import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";
import { Currencies, Store } from "./types";
import { API_URL } from "./consts";
import { RATES } from "./mockedApiResponse";
import { PERSIST_STORE_KEY } from "./store";

const getCurrentState = (): Store =>
  JSON.parse(localStorage.getItem(PERSIST_STORE_KEY) || "")?.state;

const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.json(RATES));
  })
);

describe("Currency exchange page", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("Correctly shows exchange rate", async () => {
    render(<App />);

    const exhangeRateElem = await screen.findByTestId(/exchange-rate/i);

    const state = getCurrentState();
    const fromCurrency = state.formState?.fromCurrency;
    const toCurrency = state.formState?.toCurrency;

    expect(exhangeRateElem).toBeInTheDocument();

    expect(exhangeRateElem.textContent).toEqual(
      `1 ${fromCurrency} = ${(state.rates?.[toCurrency]).toFixed(
        4
      )} ${toCurrency}`
    );
  });

  it('Properly shows "from" Balance', () => {
    render(<App />);

    const state = getCurrentState();
    const fromCurrency = state.formState?.fromCurrency;
    const fromBalance = state.balance.find(
      (item) => item.currency === fromCurrency
    );

    const fromBalanceElem = screen.getByTestId(/from-balance/i);
    expect(fromBalanceElem.textContent).toEqual(
      `Balance: ${fromBalance?.amount?.toFixed(2)} ${fromCurrency}`
    );
  });

  it('Properly shows "to" Balance', () => {
    render(<App />);

    const state = getCurrentState();
    const toCurrency = state.formState?.toCurrency;
    const toBalance = state.balance.find(
      (item) => item.currency === toCurrency
    );

    const toBalanceElem = screen.getByTestId(/to-balance/i);
    expect(toBalanceElem.textContent).toEqual(
      `Balance: ${toBalance?.amount?.toFixed(2)} ${toCurrency}`
    );
  });

  it('Properly shows "from" Balance by changing "from" currency', () => {
    render(<App />);

    userEvent.selectOptions(screen.getByTestId(/from-currency/i), [
      Currencies.GBP,
    ]);

    const state = getCurrentState();
    const fromCurrency = state.formState?.fromCurrency;
    const fromBalance = state.balance.find(
      (item) => item.currency === fromCurrency
    );

    const fromBalanceElem = screen.getByTestId(/from-balance/i);
    expect(fromBalanceElem.textContent).toEqual(
      `Balance: ${fromBalance?.amount?.toFixed(2)} ${fromCurrency}`
    );
  });

  it('Properly shows "to" Balance by changing "to" currency', () => {
    render(<App />);

    userEvent.selectOptions(screen.getByTestId(/to-currency/i), [
      Currencies.USD,
    ]);

    const state = getCurrentState();
    const toCurrency = state.formState?.toCurrency;
    const toBalance = state.balance.find(
      (item) => item.currency === toCurrency
    );

    const toBalanceElem = screen.getByTestId(/to-balance/i);
    expect(toBalanceElem.textContent).toEqual(
      `Balance: ${toBalance?.amount?.toFixed(2)} ${toCurrency}`
    );
  });

  it("Disabled exchange button till inputs are empty", () => {
    render(<App />);

    userEvent.type(screen.getByTestId(/from-amount/i), "");
    userEvent.type(screen.getByTestId(/to-amount/i), "");

    expect(screen.getByTestId(/exchange-button/i)).toBeDisabled();
  });

  it("Correctly buy USD with GBP", async () => {
    render(<App />);

    const currentBalance = getCurrentState()?.balance;

    const initialUSDBalance = currentBalance.find(
      (item) => item.currency === Currencies.USD
    );

    const addedAmount = 5;

    userEvent.type(screen.getByTestId(/from-amount/i), "");
    userEvent.type(screen.getByTestId(/to-amount/i), "");

    userEvent.selectOptions(screen.getByTestId(/from-currency/i), [
      Currencies.USD,
    ]);
    userEvent.selectOptions(screen.getByTestId(/to-currency/i), [
      Currencies.GBP,
    ]);
    userEvent.click(screen.getByTestId(/change-direction/i));
    userEvent.type(screen.getByTestId(/from-amount/i), String(addedAmount));
    userEvent.click(screen.getByTestId(/exchange-button/i));

    const fromBalance = screen.getByTestId(/from-balance/i);

    const balanceFromAmount = (
      (initialUSDBalance?.amount || 0) + addedAmount
    ).toFixed(2);

    const balanceFromText = `Balance: ${balanceFromAmount} USD`;
    expect(fromBalance.textContent).toEqual(balanceFromText);
  });

  it("Correctly sell USD for GBP", async () => {
    render(<App />);

    const currentBalance = getCurrentState()?.balance;

    const initialUSDBalance = currentBalance.find(
      (item) => item.currency === Currencies.USD
    );

    const substractAmount = 10;

    userEvent.type(screen.getByTestId(/from-amount/i), "");
    userEvent.type(screen.getByTestId(/to-amount/i), "");

    userEvent.selectOptions(screen.getByTestId(/from-currency/i), [
      Currencies.USD,
    ]);
    userEvent.selectOptions(screen.getByTestId(/to-currency/i), [
      Currencies.GBP,
    ]);

    userEvent.type(screen.getByTestId(/from-amount/i), String(substractAmount));
    userEvent.click(screen.getByTestId(/change-direction/i));

    userEvent.click(screen.getByTestId(/exchange-button/i));

    const fromBalance = screen.getByTestId(/from-balance/i);

    const balanceFromAmount = (
      (initialUSDBalance?.amount || 0) - substractAmount
    ).toFixed(2);

    const balanceFromText = `Balance: ${balanceFromAmount} USD`;
    expect(fromBalance.textContent).toEqual(balanceFromText);
  });

  it("Correctly buy EUR for USD", async () => {
    render(<App />);

    const currentBalance = getCurrentState()?.balance;

    const initialEURBalance = currentBalance.find(
      (item) => item.currency === Currencies.EUR
    );

    const addedAmount = 1;

    userEvent.type(screen.getByTestId(/from-amount/i), "");
    userEvent.type(screen.getByTestId(/to-amount/i), "");

    userEvent.selectOptions(screen.getByTestId(/from-currency/i), [
      Currencies.EUR,
    ]);
    userEvent.selectOptions(screen.getByTestId(/to-currency/i), [
      Currencies.USD,
    ]);

    userEvent.click(screen.getByTestId(/change-direction/i));

    userEvent.type(screen.getByTestId(/from-amount/i), String(addedAmount));

    userEvent.click(screen.getByTestId(/exchange-button/i));

    const fromBalance = screen.getByTestId(/from-balance/i);

    const balanceFromAmount = (
      (initialEURBalance?.amount || 0) + addedAmount
    ).toFixed(2);

    const balanceFromText = `Balance: ${balanceFromAmount} EUR`;
    expect(fromBalance.textContent).toEqual(balanceFromText);
  });

  it("Correctly sell EUR for USD", async () => {
    render(<App />);

    const currentBalance = getCurrentState()?.balance;

    const initialEURBalance = currentBalance.find(
      (item) => item.currency === Currencies.EUR
    );

    const substractAmount = 2;

    userEvent.type(screen.getByTestId(/from-amount/i), "");
    userEvent.type(screen.getByTestId(/to-amount/i), "");

    userEvent.selectOptions(screen.getByTestId(/from-currency/i), [
      Currencies.EUR,
    ]);
    userEvent.selectOptions(screen.getByTestId(/to-currency/i), [
      Currencies.USD,
    ]);

    userEvent.click(screen.getByTestId(/change-direction/i));

    userEvent.type(screen.getByTestId(/from-amount/i), String(substractAmount));

    userEvent.click(screen.getByTestId(/exchange-button/i));

    const fromBalance = screen.getByTestId(/from-balance/i);

    const balanceFromAmount = (
      (initialEURBalance?.amount || 0) - substractAmount
    ).toFixed(2);

    const balanceFromText = `Balance: ${balanceFromAmount} EUR`;
    expect(fromBalance.textContent).toEqual(balanceFromText);
  });
});
