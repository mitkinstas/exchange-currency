import React, { ChangeEventHandler, VFC, SelectHTMLAttributes } from "react";
import styled from "styled-components/macro";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: Option[];
  selectedValue?: Option["value"];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const StyledSelect = styled.select`
  min-width: 0;
  outline-offset: 2px;
  appearance: none;
  padding-bottom: 1px;
  font-size: 1.2rem;
  border-radius: 0.3rem;
  border: solid 0.1rem rgb(226, 232, 240);
  transition: border-color 100ms ease-out;
  padding: 0.2rem 0.4rem;
  height: 2.4rem;
  box-sizing: border-box;
  outline: none;
  color: #444;

  &:hover {
    border-color: rgb(203, 213, 224);
  }

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 0.1rem #3182ce;
  }
`;

const StyledSelectOption = styled.option`
  font-size: 1.6rem;
`;

export const Select: VFC<SelectProps> = ({
  options,
  selectedValue,
  onChange,
  ...rest
}) => {
  return (
    <StyledSelect {...rest} value={selectedValue} onChange={onChange}>
      {options?.map((option) => (
        <StyledSelectOption key={option.value} value={option.value}>
          {option.label}
        </StyledSelectOption>
      ))}
    </StyledSelect>
  );
};
