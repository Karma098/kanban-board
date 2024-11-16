import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Board from "./components/Board";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "status"
  );
  const [sorting, setSorting] = useState(
    localStorage.getItem("sorting") || "priority"
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);
  }, [grouping, sorting]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
      // console.log(data.users);
      // console.log(data.tickets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="app">
      <Header
        grouping={grouping}
        sorting={sorting}
        setGrouping={setGrouping}
        setSorting={setSorting}
      />
      <Board
        tickets={tickets}
        users={users}
        grouping={grouping}
        sorting={sorting}
      />
    </div>
  );
}

export default App;
