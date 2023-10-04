import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import GameDetails from "./components/GameDetails";

function App() {
  return (
    <Routes>
      <Route path="" index element={<Home />} />
      <Route path="game/:id" index element={<GameDetails />} />
      <Route path="/*" element={<h1>Error page</h1>} />
    </Routes>
  );
}

export default App;
