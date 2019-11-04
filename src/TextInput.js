import React from 'react';

export default function TextInput(props) {

  const { name, onChange } = props;
  const value = props.value || "";
  const label = props.label || name;
  const type = props.type || "text";

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
}
