import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css'; // Choose any theme you like

interface DatePickerFieldProps {
  label: string,
  value?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  required?: boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select a date",
  required = false
}) => {
  // Local state for date input
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  // Update local and parent state on date change
  const handleDateChange = (dates: Date[]) => {
    const newDate = dates[0] || null;
    setSelectedDate(newDate);
    onChange(newDate);
  };

  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium common-text mb-1">
        {label.concat(required ? ' *' : '')}
      </label>
    <Flatpickr
      value={selectedDate}
      onChange={handleDateChange}
      options={{
        dateFormat: 'd/m/Y', // ISO format for Year-Month-Day
        altFormat: 'F j, Y', // User-friendly format "Month Day, Year"
        altInput: false, // Enables alternative format display
        allowInput: true, // Allows manual input as well
      }}
      placeholder={placeholder}
      className="common-input" // Styling for the input
    />
    </div>
  );
};

export default DatePickerField;
