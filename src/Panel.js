import React from 'react';

export default function Panel({ children, grow, list }) {

  let classNames = ["panel"];
  if (grow) {
    classNames.push("grow");
  }
  if (list) {
    classNames.push("list");
  }
  return (
    <div className={classNames.join(" ")}>
      {children}
    </div>
  );
}
