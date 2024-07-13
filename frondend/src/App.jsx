import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dash from "./pages/dahbord/Dash";
import Creatnews from "./pages/creat-news/Creat";
import Add from "./pages/update/Add";
import Home from "./pages/user/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/admin_login/loginpage";
import NewsDetail from "./components/newsstory/NewsDetail"; 
import Breaking from "./pages/user/breaking-news/Breaking";
import Sports from "./pages/user/sports-news/Sports";
import Bussines from "./pages/user/bussines-news/Bussines";

const AdminRoutes = () => (
  <>
    <Routes>
      <Route path="/dash" element={<Dash />} />
      <Route path="/creat" element={<Creatnews />} />
      <Route path="/add/:id" element={<Add />} />
      <Route path="/admin" element={<Login />} />
    </Routes>
  </>
);

const UserRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/breaking-news" element={<Breaking />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/business" element={<Bussines />} />
    </Routes>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;