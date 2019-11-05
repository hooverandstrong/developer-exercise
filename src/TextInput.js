import React from 'react';

export default function TextInput(props) {

  const { name, size, onChange } = props;
  const value = props.value || "";
  const label = props.label || name;
  const type = props.type || "text";

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} size={size} onChange={onChange} />
    </div>
  );
}
