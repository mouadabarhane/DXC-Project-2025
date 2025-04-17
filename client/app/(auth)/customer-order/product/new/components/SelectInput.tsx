import React from "react";

import Select from "react-select";

type OptionType = { value: string; label: string };

type PropsType = {
  options: Array<OptionType>;
  selected: Array<OptionType>;
  onChange: (options: any) => void;
  isMulti?: boolean;
  className?: string;
};

const SelectInput = ({
  options,
  selected,
  onChange,
  isMulti,
  className,
}: PropsType) => (
  <Select
    isMulti={isMulti}
    options={options}
    className={`basic-multi-select ${className || ""}`}
    classNamePrefix="select"
    onChange={onChange}
    value={selected}
  />
);

export default SelectInput;
