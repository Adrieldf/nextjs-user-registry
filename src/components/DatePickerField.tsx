import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerFieldProps {
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  selectedDate,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium common-text mb-1">
        {label}
      </label>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        className="w-full px-3 py-2 border rounded-lg common-input"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default DatePickerField;
