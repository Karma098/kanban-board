import React, { useState } from "react";
import { ReactComponent as DisplayIcon } from "../assets/Display.svg";
import { ReactComponent as Down } from "../assets/down.svg";
function Header({ grouping, sorting, setGrouping, setSorting }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="dropdown">
        <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
          <DisplayIcon />
          Display
          <Down />
        </button>

        {isOpen && (
          <div className="dropdown-content">
            <div className="dropdown-item">
              <span>Grouping</span>
              <select
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering</span>
              <select
                value={sorting}
                onChange={(e) => setSorting(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
