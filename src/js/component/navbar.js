import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar  mx-auto mb-3 d-flex justify-content-end col-md-10">
			
			<div className="me-1">
				<Link to="/addContac">
					<button className="btn btn-success">Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};
