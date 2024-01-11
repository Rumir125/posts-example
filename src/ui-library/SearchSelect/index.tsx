import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { ClickOutsideListener } from "..";
import withLogger from "../../shared/hoc/withLogger";
import "./style.css";

interface OptionProps {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Option: FC<OptionProps> = ({ value, children, onClick }) => {
  return (
    <div onClick={onClick} key={value} className="Select__option">
      {children}
    </div>
  );
};

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  onChangeValue: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  onItemSelected?: (value: string) => void;
}

const SearchSelect: FC<SelectProps> = ({
  children,
  onChangeValue,
  placeholder = "",
  onItemSelected,
  ...props
}) => {
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState<
    { value: string; label: React.ReactNode }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const childOptions = React.Children.map(children, (child) => {
      if (
        React.isValidElement(child)
        // TODO: Fix this child check
        // &&
        // (child.type as { name: string })?.name === Option.name
      ) {
        return {
          value: (child.props as OptionProps).value,
          label: (child.props as OptionProps).children,
        };
      }
      return null;
    })?.filter((child) => {
      if (!searchText) return child !== null;
      return (
        child !== null &&
        child.label?.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    }) as {
      value: string;
      label: React.ReactNode;
    }[];

    setOptions(childOptions);
  }, [children, searchText]);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleClickOption = (value: string) => {
    setSearchText(value);
    setIsOpen(false);
    onChangeValue?.(value);
    onItemSelected?.(value);
  };

  return (
    <ClickOutsideListener
      onClickOutside={() => setIsOpen(false)}
      className="Select__wrapper"
      {...props}
    >
      <div className="Select-input__wrapper">
        <input
          className="Select-input"
          type="text"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            onChangeValue?.(event.target.value);
          }}
          onFocus={handleInputFocus}
          placeholder={placeholder}
        />
        <div
          className="Select-input__clear"
          style={{
            visibility: searchText ? "visible" : "hidden",
          }}
          onClick={() => {
            setSearchText("");
            onChangeValue?.("");
          }}
        >
          X
        </div>
        {isOpen && (
          <div className="Select__options-container">
            {options.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                onClick={() =>
                  handleClickOption(option.label?.toString() || "")
                }
              >
                {option.label}
              </Option>
            ))}
          </div>
        )}
      </div>
    </ClickOutsideListener>
  );
};

const LoggedOption = withLogger(Option);
const LoggedSearchSelect = withLogger(SearchSelect);

export { LoggedOption as Option, LoggedSearchSelect as SearchSelect };
