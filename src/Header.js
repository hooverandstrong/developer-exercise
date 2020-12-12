import React from 'react';
import { ADD, SAVE } from './actions';

export default function Header(props) {
  const { selected, setSelected, dispatch } = props;

  let buttons = [];
  if (selected) {
    buttons = [
      <button key="add" onClick={() => dispatch({type: ADD})}>Add</button>,
      <button key="save" onClick={() => dispatch({type: SAVE, payload: selected})}>Save</button>,
      <button key="cancel" onClick={() => setSelected(undefined)}>Cancel</button>
    ];
  }

  return (
    <div className="header">
      {buttons}
    </div>
  );
}
