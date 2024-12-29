import React from "react";

interface SelectInputProps {
  label?: string;
  testId: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const SelectInput = ({
  label,
  testId,
  options,
  value,
  onChange,
}: SelectInputProps) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <select
        data-testid={testId}
        id={label}
        className="w-full p-2 border border-gray-300 text-gray-900 rounded focus:ring focus:ring-blue-200 dark:bg-black dark:text-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
