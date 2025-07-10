import React from 'react';
import lunaStyle from '@Sass/pages/luna.module.scss'; // Assuming lunaStyle might be needed for some styling

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  inputRef,
  className,
  rows,
  cols,
  id
}) => {
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <fieldset>
      {label && <label htmlFor={id} className="text-right">{label}</label>}
      <InputComponent
        ref={inputRef}
        className={className || (type === 'textarea' ? lunaStyle.response : '')} // Apply lunaStyle.response for textareas by default
        name={id}
        id={id}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type === 'textarea' ? undefined : type} // Only pass type for input elements
      />
    </fieldset>
  );
};

export default InputField; 