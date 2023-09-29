import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 



import { Context } from "../store/appContext";

import "../../styles/addContac.css";

export const AddContac = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const location = useLocation();  

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const editId = queryParams.get("edit");
	
		if (editId !== null) {
		  //  cargar los datos del contacto si se está editando
		  const contactToEdit = store.contacts.find((item)=>item.id==editId);
	
		  //  datos del contacto a editar
		 	 if (contactToEdit !== undefined) {
		  		document.getElementById("full_name").value = contactToEdit.full_name;
		  		document.getElementById("email").value = contactToEdit.email;
		  		document.getElementById("phone").value = contactToEdit.phone;
		  		document.getElementById("address").value = contactToEdit.address;
			 }
		}
	  }, [location.search, store.contacts]);
	
	function submitForm(e){
		e.preventDefault()
		
		const queryParams = new URLSearchParams(location.search);
  		const editId = queryParams.get("edit");

		let dataForm = new FormData(e.target);
		let data ={};

		for(const entrada of dataForm.entries()){
			console.log(entrada)
			data[entrada[0]]=entrada[1];			
		};
		if(editId !== null){
			actions.editorcontac(editId, data);
		}else{
		console.log(data)
		actions.addContac(data);
		}
		navigate('/');
	}

	return (
		<div className="container col-md-12 mx-auto">
			
			<h1  className="text-center m-2">Add a new contact</h1>
			
			<div className="my-3 col-md-12 mx-auto">
			<form onSubmit={submitForm}>	
				<label htmlFor="name" className="form-label">Full name</label>
    			<input type="text" className="form-control" id="full_name" aria-describedby="nameContact" name="full_name" placeholder="Full Name"></input>

				<label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    			<input type="email" className="form-control" id="email" aria-describedby="email" name="email" placeholder="Enter email"/>

				<label htmlFor="Phone" className="form-label">Phone</label>
    			<input type="number" className="form-control" id="phone" aria-describedby="nameContact" name="phone" placeholder="Enter phone"></input>

				<label htmlFor="adres" className="form-label">Address</label>
    			<input type="text" className="form-control" id="address" aria-describedby="nameContact" name="address" placeholder="Enter address"></input>
				<div className="d-grid gap-2 col-12 mx-auto my-2">
					
						<button type="submit" className="btn btn-primary" > Save </button>
				
				</div>
			</form>
			</div>

			<Link to="/">
				<span>Or get back to contacts</span>
			</Link>
		</div>
	);
};
