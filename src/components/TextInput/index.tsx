import React, { VFC, InputHTMLAttributes } from "react";
import styled from "styled-components/macro";

const StyledTextInput = styled.input`
  font-size: 1.6rem;
  height: 2.4rem;
  box-sizing: border-box;
  display: block;
  border-radius: 0.3rem;
  border: solid 0.1rem rgb(226, 232, 240);
  outline: none;
  padding: 0.2rem 0.4rem;
  color: #444;

  &:hover {
    border-color: rgb(203, 213, 224);
  }

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 0.1rem #3182ce;
  }
`;

const StyledExceedBalanceMessage = styled.div`
  color: #e74545;
  font-size: 1rem;
  margin-top: 0.4rem;
`;

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isExceedBalance?: boolean;
}

const ExceedBalanceMessage = () => (
  <StyledExceedBalanceMessage>Exceeds balance</StyledExceedBalanceMessage>
);

export const TextInput: VFC<TextInputProps> = ({
  isExceedBalance,
  ...props
}) => {
  return (
    <>
      <StyledTextInput {...props} />
      {isExceedBalance && <ExceedBalanceMessage />}
    </>
  );
};
