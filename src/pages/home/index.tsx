import React from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/" },
  { to: "/home" },
  { to: "/me" },
  { to: "/habits" },
  { to: "/habits/agenda" },
  { to: "/habits/calendar" },
  { to: "/habits/manage" },
  { to: "/habits/create" },
  { to: "/habits/edit/edit-id-123" },
  { to: "/habits/details/details-id-123" },
  { to: "/habits/wtf" },
];

// TODO remove me
const Home: React.FC<unknown> = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {links.map(({ to }) => (
          <li key={to}>
            <Link to={to}>{to}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
