import React from "react";
import { NavLink } from "react-router-dom";

// <NavLink to="help">Help</NavLink>

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="create">Add Expense</NavLink>
    </header>
);

export default Header;