import React from 'react';
import lunaStyle from '@Sass/pages/luna.module.scss'; // Assuming lunaStyle might be needed for some styling

const InputField = ({
  label,
  labelClassName,
  placeholder,
  value,
  onChange,
  type = 'text',
  inputRef,
  rows,
  cols,
  id
}) => {
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <fieldset>
      {label && <label htmlFor={id} className={labelClassName || ''}>{label}</label>}
      <InputComponent
        ref={inputRef}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type === 'textarea' ? undefined : type} // Only pass type for input elements
      />
    </fieldset>
  );
};

export default InputField; 