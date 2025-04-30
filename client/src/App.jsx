import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import CreatorDashboard from "./pages/CreatorDashboard";
import Gallery from "./pages/Gallery";
import MediaDetail from "./pages/MediaDetail";
import MediaSearch from "./pages/MediaSearch";

import CreatorLayout from "./layouts/CreatorLayout";
import ConsumerLayout from "./layouts/ConsumerLayout";

const getUser = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

const App = () => {
  const user = getUser();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {user.role === "creator" ? (
        <Route element={<CreatorLayout />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="*" element={<Navigate to="/creator-dashboard" />} />
        </Route>
      ) : (
        <Route element={<ConsumerLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/media/:id" element={<MediaDetail />} />
          <Route path="/search" element={<MediaSearch />} />
          <Route path="*" element={<Navigate to="/gallery" />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
