import React, { useState, useEffect, useRef, ReactNode } from "react";

interface DropdownProps {
  buttonText: string;
  children: ReactNode;
}

export default function Dropdown({ buttonText, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleToggle} className="accent-button">
        {buttonText}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 bg-slate-700 border rounded shadow-lg p-3 w-48 right-0 z-10 flex flex-col gap-2">
          {children}
        </div>
      )}
    </div>
  );
}
