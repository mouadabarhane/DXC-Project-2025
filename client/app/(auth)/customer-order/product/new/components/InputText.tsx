import React from "react";

type InputTextType = {
  slug: string;
  title: string;
  required?: boolean;
  placeholder?: string;
  value?: any;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export default function InputText({
  slug,
  title,
  required = false,
  placeholder,
  value,
  onChange,
  disabled = false,
}: InputTextType) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };
  return (
    <div className="sm:col-span-3 w-full">
      <label
        htmlFor={slug}
        className="block text-xs font-medium leading-6 text-gray-900"
      >
        {title} {required && "*"}
      </label>
      <div className="mt-2 w-full">
        <input
          type="text"
          name={slug}
          id={slug}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5f249f] sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-300"
          value={value}
          onChange={handleOnChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
