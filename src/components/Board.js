import React, { useMemo } from "react";
import { ReactComponent as UrgentIcon } from "../assets/SVG - Urgent Priority colour.svg";
import { ReactComponent as UrgentGrey } from "../assets/SVG - Urgent Priority grey.svg";
import { ReactComponent as HighIcon } from "../assets/Img - High Priority.svg";
import { ReactComponent as MediumIcon } from "../assets/Img - Medium Priority.svg";
import { ReactComponent as LowIcon } from "../assets/Img - Low Priority.svg";
import { ReactComponent as NoIcon } from "../assets/No-priority.svg";
import { ReactComponent as Plus } from "../assets/add.svg";
import { ReactComponent as Dot } from "../assets/3 dot menu.svg";
import { ReactComponent as Todo } from "../assets/To-do.svg";
import { ReactComponent as Inprogress } from "../assets/in-progress.svg";
import { ReactComponent as Backlog } from "../assets/Backlog.svg";
import { ReactComponent as GreyFilled } from "../assets/grey-filled.svg";

import { ReactComponent as Cancelled } from "../assets/Cancelled.svg";
import { ReactComponent as Done } from "../assets/Done.svg";
import Profile from "./Profile";

const priorityIcons = {
  4: <UrgentIcon />,
  3: <HighIcon />,
  2: <MediumIcon />,
  1: <LowIcon />,
  0: <NoIcon />,
};

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No Priority",
};

function Board({ tickets, users, grouping, sorting }) {
  const groupedTickets = useMemo(() => {
    let groups = {};

    if (grouping === "status") {
      tickets.forEach((ticket) => {
        if (!groups[ticket.status]) {
          groups[ticket.status] = [];
        }
        groups[ticket.status].push(ticket);
      });

      if (!groups["Todo"]) {
        groups["Todo"] = [];
      }
      if (!groups["In progress"]) {
        groups["In progress"] = [];
      }
      if (!groups["Backlog"]) {
        groups["Backlog"] = [];
      }
      if (!groups["Done"]) {
        groups["Done"] = [];
      }
      if (!groups["Cancelled"]) {
        groups["Cancelled"] = [];
      }
    } else if (grouping === "user") {
      users.forEach((user) => {
        groups[user.name] = tickets.filter(
          (ticket) => ticket.userId === user.id
        );
      });
    } else if (grouping === "priority") {
      [0, 1, 2, 3, 4].forEach((priority) => {
        groups[priorityLabels[priority]] = tickets.filter(
          (ticket) => ticket.priority === priority
        );
      });
    }

    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => {
        if (sorting === "priority") {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groups;
  }, [tickets, users, grouping, sorting]);

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  return (
    <>
      <div className="board">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <div key={group} className="column">
            <div className="column-header">
              <div className="group-name">
                <span className="todo">
                  {grouping === "status" && group === "Todo" && <Todo />}
                  {grouping === "status" && group === "In progress" && (
                    <Inprogress />
                  )}
                  {grouping === "status" && group === "Backlog" && <Backlog />}
                  {grouping === "status" && group === "Cancelled" && (
                    <Cancelled />
                  )}
                  {grouping === "status" && group === "Done" && <Done />}
                  {grouping === "user" && <Profile user={group} />}
                </span>
                <span className="group-class">{group}</span>
                <span className="ticket-count">{tickets.length}</span>
              </div>

              <div className="icons">
                <Plus />
                <Dot />
              </div>
            </div>

            {tickets.map((ticket) => (
              <div key={ticket.id} className="card">
                <div className="card-id">
                  {ticket.id}
                  {grouping !== "user" && (
                    <div className="user-avatar">
                      {getUserById(ticket.userId)?.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="priority-class">
                  <span className="priority">
                    {grouping === "priority" && ticket.status === "Todo" && (
                      <Todo />
                    )}
                    {grouping === "priority" &&
                      ticket.status === "In progress" && <Inprogress />}
                    {grouping === "priority" && ticket.status === "Backlog" && (
                      <Backlog />
                    )}
                    {grouping === "priority" &&
                      ticket.status === "Cancelled" && <Cancelled />}
                    {grouping === "priority" && ticket.status === "Done" && (
                      <Done />
                    )}
                  </span>
                  <div className="card-title">{ticket.title}</div>
                </div>

                <div className="outermost">
                  {grouping !== "priority" && (
                    <div className="urgentGrey">
                      {priorityIcons[ticket.priority]}{" "}
                    </div>
                  )}
                  {grouping === "priority" && ticket.priority === 1 && (
                    <div className="urgentGrey">
                      <UrgentGrey />
                    </div>
                  )}
                  <div className="greyFill">
                    {ticket.tag && (
                      <div className="tag2">
                        <span className="innerGreyFill">
                          {grouping === "priority" && <GreyFilled />}
                        </span>
                        {ticket.tag}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {(group === "Done" ||
              group === "Cancelled" ||
              group === "Todo" ||
              group === "In progress" ||
              group === "Backlog") &&
              tickets.length === 0 && (
                <div className="empty-card">No tickets in this status</div>
              )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
