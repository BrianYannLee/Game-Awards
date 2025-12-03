import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import CreateGame from "./components/Game/CreateGame"
import DeleteGame from "./components/Game/DeleteGame"
import EditGame from "./components/Game/EditGame"
import GameDetails from "./components/Game/GameDetail"
import GameList from "./components/Game/GameList"
import "./App.css";

export default function App() {
  return (
    <div>
      {/* Navbar */}
      <nav>
        <ul>
          <li>
            <Link to="/">Game List</Link>
          </li>
          <li>
            <Link to="/create">Create Game</Link>
          </li>
        </ul>
      </nav>
      {/* Routes for each screen or page */}
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/create" element={<CreateGame />} />
        {/* path for game details must take in an id */}
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/edit/:id" element={<EditGame />} />
        <Route path="/delete/:id" element={<DeleteGame />} />
      </Routes>
    </div>
  );
}
