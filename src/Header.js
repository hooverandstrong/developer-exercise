import React from 'react';

export default function Header(props) {
  const { selected } = props;

  let buttons = [];
  if (selected) {
    buttons = [
      <button key="add">Add</button>,
      <button key="save">Save</button>,
      <button key="save">Cancel</button>
    ];
  }

  return (
    <div className="header">
      {buttons}
    </div>
  );
}
