import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Select = ({
  label,
  options,
  selectedValue,
  placeholder,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <fieldset className="selectContainer">
      <label htmlFor="">{label}</label>
      <div className="selectHeader" onClick={toggleSelect}>
        <span>{selectedValue || placeholder}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className="selectOptions">
          {options.map((option, optionIndex) => (
            <div key={optionIndex} onClick={() => handleClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
};

export default Select; 