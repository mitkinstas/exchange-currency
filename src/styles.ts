import styled, { createGlobalStyle } from "styled-components/macro";

import { TextInput } from "./components/TextInput";
import { Select } from "./components/Select";
import { Logo } from "./components/Logo";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
  }
`;

export const StyledSelect = styled(Select)`
  margin-right: 0.4rem;
`;

export const StyledTextInput = styled(TextInput)`
  max-width: 14rem;
  @media only screen and (max-width: 640px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const StyledExchangeRate = styled.div`
  display: flex;
  font-size: 0.9rem;
  color: #555;
  margin: 0.4rem auto;
  justify-content: center;
`;

export const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 640px) {
    transform: rotate(90deg);
  }
`;

export const StyledBalance = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

export const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

export const AppWrapper = styled.section`
  max-width: 700px;
  margin: auto;
`;

export const CurrencyInputs = styled.div`
  padding: 1rem;
  margin: auto;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media only screen and (max-width: 640px) {
    flex-direction: column;
    padding: 1rem 0;
  }
`;

export const StyledLogo = styled(Logo)`
  display: block;
  margin: 3rem auto;
  cursor: pointer;
`;

export const Button = styled.button`
  font-size: 1.2rem;
  height: 2.4rem;
  background-color: #3182ce;
  font-family: "Inter", sans-serif;
  color: #fff;
  border: none;
  border-radius: 0.3rem;
  outline: none;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #7da9d1;
    cursor: default;
  }

  &:hover {
    background-color: #2b6bb0;

    &:disabled {
      background-color: #7da9d1;
    }
  }

  &:active {
    box-shadow: #c3daf7 0 0 0 0.2rem;
  }

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

export const StyledArrowButton = styled(Button)`
  background-color: #e8e8e8;
  margin: 0;
  margin-top: 3.2rem;
  border: solid 0.1rem rgb(226, 232, 240);

  &:hover {
    border-color: rgb(203, 213, 224);
    background-color: #f0f0f0;
  }

  &:active {
    box-shadow: #c3daf7 0 0 0 0.2rem;
  }

  @media only screen and (max-width: 640px) {
    margin-top: 0;
    justify-content: center;
  }
`;

export const Title = styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
`;
