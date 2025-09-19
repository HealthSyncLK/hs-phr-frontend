import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DateOfBirthInput } from "../components/form/DateOfBirthInput";

const meta: Meta<typeof DateOfBirthInput> = {
  title: "Form Controls/DateOfBirthInput",
  component: DateOfBirthInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateOfBirthInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="w-80">
        <DateOfBirthInput id="dob" value={value} onChange={setValue} />
        <p className="mt-2 text-sm text-gray-600">
          Current value: <span className="font-mono">{value}</span>
        </p>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="w-80">
        <DateOfBirthInput
          id="dob-error"
          value={value}
          onChange={setValue}
          hasError
        />
        <p className="mt-2 text-sm text-red-600">Invalid date format</p>
      </div>
    );
  },
};

export const Prefilled: Story = {
  render: () => {
    const [value, setValue] = useState("1992/03/12");

    return (
      <div className="w-80">
        <DateOfBirthInput
          id="dob-prefilled"
          value={value}
          onChange={setValue}
        />
        <p className="mt-2 text-sm text-gray-600">
          Selected date: <span className="font-mono">{value}</span>
        </p>
      </div>
    );
  },
};