import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import SavedProperties from "./pages/SavedProperties";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AgentProfile from "./pages/AgentProfile";
import Agents from "./pages/Agents";
import Commercial from "./pages/Commercial";
import CommercialDetails from "./pages/CommercialDetails";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
          path="/properties/:id"
          element={<PropertyDetails />}
        />

        <Route
          path="/saved"
          element={<SavedProperties />}
        />

        <Route
          path="/signin"
          element={<SignIn />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/agents"
          element={<Agents />}
        />
        <Route
          path="/agents/:id"
          element={<AgentProfile />}
        />
        <Route
          path="/commercial"
          element={<Commercial />}
        />

        <Route
          path="/commercial/:id"
          element={<CommercialDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;