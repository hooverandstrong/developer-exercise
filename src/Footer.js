import React from 'react';

export default function Header() {

  const date = new Date();

  return (
    <div className="footer">
      <div className="copyright">
        ©{date.getFullYear()} Hoover &amp; Strong, Inc.
      </div>
      <div className="usermenu">
        <button>Log In</button>
      </div>
    </div>
  );
}
