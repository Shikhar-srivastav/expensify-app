import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
    <div>
        <h3>404!</h3>
        <p>You seem to be lost</p>
        <Link to="/">Go back to home page</Link>
    </div>
);

export default NotFoundPage;