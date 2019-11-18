import React from 'react';

export default function DataGrid(props) {

  const { renderHeader, renderLine, data } = props;

  function renderLines() {
    return data.map((item, idx) => renderLine(item, idx));
  }

  const head = renderHeader();
  const body = renderLines();
  return (
    <table className="data-grid">
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </table>
  );
}
