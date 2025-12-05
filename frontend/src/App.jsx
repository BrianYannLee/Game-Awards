import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

// Game components
import CreateGame from "./components/Game/CreateGame";
import DeleteGame from "./components/Game/DeleteGame";
import EditGame from "./components/Game/EditGame";
import GameDetails from "./components/Game/GameDetail";
import GameList from "./components/Game/GameList";

// Category components
import CategoryList from "./components/Category/CategoryList";
import CreateCategory from "./components/Category/CreateCategory";
import CategoryDetail from "./components/Category/CategoryDetail";
import EditCategory from "./components/Category/EditCategory";
import DeleteCategory from "./components/Category/DeleteCategory";

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
        <div className="navbar-logo">
          <img src="/logo-tga-gold.svg" alt="TGA Logo" />
        </div>
        <div className="navbar-links">
        <Link to="/nominee" className="nav-link">NOMINIEE</Link>
        <Link to="/games" className="nav-link">GAME</Link>
        <Link to="/categories" className="nav-link">CATEGORY</Link>
      </div>
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
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/category/edit/:id" element={<EditCategory />} />
        <Route path="/category/delete/:id" element={<DeleteCategory />} />

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
