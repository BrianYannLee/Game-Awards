import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Game components
import CreateGame from "./components/Game/CreateGame";
import DeleteGame from "./components/Game/DeleteGame";
import EditGame from "./components/Game/EditGame";
import GameDetails from "./components/Game/GameDetail";
import GameList from "./components/Game/GameList";

// Category components
import CategoryList from "./components/Category/CategoryList";
import CreateCategory from "./components/Category/CreateCategory";

// Nominee components
import NomineeList from "./components/Nominee/NomineeList";
import CreateNominee from "./components/Nominee/CreateNominee";
import DeleteNominee from "./components/Nominee/DeleteNominee";
import EditNominee from "./components/Nominee/EditNominee";

export default function App() {
  return (
    <div>
      {/* Navbar */}
      <nav>
        <ul>
          <li>
            <Link to="/games">Game List</Link>
          </li>
          <li>
            <Link to="/categories">Category List</Link>
          </li>
          <li>
            <Link to="/nominee">Nominees</Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Games */}
        <Route path="/games" element={<GameList />} />
        <Route path="/games/create" element={<CreateGame />} />
        <Route path="/games/details/:id" element={<GameDetails />} />
        <Route path="/games/edit/:id" element={<EditGame />} />
        <Route path="/games/delete/:id" element={<DeleteGame />} />

        {/* Categories */}
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/create" element={<CreateCategory />} />

        {/* Nominees */}
        <Route path="/nominee" element={<NomineeList />} />
        <Route path="/nominee/create" element={<CreateNominee />} />
        <Route path="/nominee/edit/:id" element={<EditNominee />} />
        <Route path="/nominee/delete/:id" element={<DeleteNominee />} />

        {/* Default fallback */}
        <Route path="*" element={<NomineeList />} />
      </Routes>
    </div>
  );
}
