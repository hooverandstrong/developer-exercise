import React from 'react';

function Option(props) {
  const { label, value } = props;

  return (
    <option value={value}>
      {label}
    </option>
  );
}

export default function Dropdown(props) {

  const { name, options, prompt, onChange } = props;
  const value = props.value || "";
  const label = props.label || name;

  let promptOption = null;
  if (prompt) {
    promptOption = <Option label={prompt} value="" />;
  }

  let optionList = null;
  if (options) {
    optionList = options.map(option => {
      const { value, label } = option;
      return <Option key={value} value={value} label={label} />;
    });
  }

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {promptOption}
        {optionList}
      </select>
    </div>
  );
}
