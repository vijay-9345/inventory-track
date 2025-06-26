// App.js
import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import AddItem from './components/AddItem';
import AddQuantity from './components/AddQuantity';
import ViewItems from './components/ViewItems';
import UpdateItem from './components/UpdateItem';
import RemoveItem from './components/RemoveLastItem';
import DeleteItem from './components/DeleteItem';
import ReduceQuantity from './components/ReduceQuantity';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, AuthContext } from './components/AuthContext';

const navItems = [
  { to: "/add-item", label: "Add Item", img: "https://img.icons8.com/color/96/000000/add--v1.png" },
  { to: "/add-quantity", label: "Add Quantity" }, // No img property
  { to: "/view-items", label: "View Items", img: "https://img.icons8.com/color/96/000000/view-file.png" },
  { to: "/update-item", label: "Update Item", img: "https://img.icons8.com/color/96/000000/edit--v1.png" },
  { to: "/remove-item", label: "Remove Item", img: "https://img.icons8.com/color/96/000000/delete-sign.png" },
  { to: "/delete-item", label: "Delete Item", img: "https://img.icons8.com/color/96/000000/erase.png" },
  { to: "/reduce-quantity", label: "Reduce Quantity", img: "https://img.icons8.com/color/96/000000/minus.png" }
];

const IndexPage = () => (
  <div className="home-container">
    <h1 className="home-title">Inventory Management</h1>
    <div className="card-grid">
      {navItems.map((item) => (
        <Link to={item.to} className="nav-card" key={item.to}>
          {/* Only render image if present */}
          {item.img && <img src={item.img} alt={item.label} className="nav-card-img" />}
          <span className="nav-card-label">{item.label}</span>
        </Link>
      ))}
    </div>
  </div>
);

// PrivateRoute wrapper
function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={
            <PrivateRoute>
              <IndexPage />
            </PrivateRoute>
          } />
          <Route path="/add-item" element={
            <PrivateRoute>
              <AddItem />
            </PrivateRoute>
          } />
          <Route path="/add-quantity" element={
            <PrivateRoute>
              <AddQuantity />
            </PrivateRoute>
          } />
          <Route path="/view-items" element={
            <PrivateRoute>
              <ViewItems />
            </PrivateRoute>
          } />
          <Route path="/update-item" element={
            <PrivateRoute>
              <UpdateItem />
            </PrivateRoute>
          } />
          <Route path="/remove-item" element={
            <PrivateRoute>
              <RemoveItem />
            </PrivateRoute>
          } />
          <Route path="/delete-item" element={
            <PrivateRoute>
              <DeleteItem />
            </PrivateRoute>
          } />
          <Route path="/reduce-quantity" element={
            <PrivateRoute>
              <ReduceQuantity />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
