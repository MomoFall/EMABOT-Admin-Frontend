import './Options.css';
import { NavLink } from 'react-router-dom';

function Options() {
  return (
    <div className="options-container">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Vue d'ensemble</NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Produits</NavLink>
        <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>Commandes</NavLink>
    </div>
  )
}

export default Options;
