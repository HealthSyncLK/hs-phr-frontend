import React, { useState } from "react";
import { InputMask } from "@react-input/mask";
import { Input } from "@repo/ui/components/form/Input";
import { DatePicker } from "@repo/ui/components/form/DatePicker";
import { Icon } from "../general/Icon";

interface DateOfBirthInputProps {
  value?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  id?: string;
}

export const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({
  value = "",
  onChange,
  hasError = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // The 'YYYY/MM/DD' mask defines the structure.
  // The 'replacement' object maps each character to a regular expression,
  // which tells the component to only accept digits.
  // By default, the `InputMask` component shows an underscore for
  // unentered characters, which is what you're looking for.
  const mask = "YYYY-MM-DD";
  const replacement = {
    Y: /\d/,
    M: /\d/,
    D: /\d/,
  };

  const handleDateSelect = (date: Date) => {
    const yyyy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const formatted = `${yyyy}-${mm}-${dd}`;
    onChange?.(formatted);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <InputMask
        mask={mask}
        type="text"
        replacement={replacement}
        value={value}
        onChange={(e: { target: { value: string } }) =>
          onChange?.(e.target.value)
        }
        onFocus={() => setIsOpen(false)}
        placeholder="YYYY-MM-DD"
        showMask
        component={Input}
        hasError={hasError}
        id={id}
        className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
        hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
      }`}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-transparent border-none p-0 m-0"
        tabIndex={-1}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open date picker"
      >
        <Icon name="calendar" className="text-text-light" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-neutral-gray-100 bg-white shadow-lg">
          <DatePicker onDayClick={handleDateSelect} />
        </div>
      )}
    </div>
  );
};
