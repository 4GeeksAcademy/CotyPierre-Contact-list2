import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import {Modal} from "../component/modal"
import { FaLocationDot, FaPhoneFlip, FaEnvelope, FaTrashCan,FaPencil } from "react-icons/fa6";
import joanImage from "../../img/joankiller.jpg";


export const ContacTarjet = (props) => {
	const { store,actions } = useContext(Context);
	
	
		

	return(
							<div className="card contactTarjet">
								<div className="card-body contacData d-flex justify-content-start">
									<div className="p-2 col-md-3">
										<img className ="contactPhoto" src={joanImage}/>
									</div>
									<div className="p-1 col-md-9">
										<div className="contentName d-flex justify-content-between">
											<div>
												<p className ="namecontac">{props.namecontact}</p>
											</div>
											<div>
												<Link to={`/addContac?edit=${props.id}`}>
													<button className="editor p-2 mx-3"><FaPencil/></button>
												</Link>
												<button className="delete p-2 mx-3" onClick={()=> actions.setContactToDelete(props.id)}><FaTrashCan/></button>
												<Modal />
											</div>
										</div>
										<div className="contentOtherData">
											<p className ="address"><FaLocationDot/><span className="p-2">{props.address}</span></p>
											<p className ="phone"><FaPhoneFlip/><span className="p-2">{props.phone}</span></p>
											<p className ="email"><FaEnvelope/><span className="p-2">{props.email}</span></p>
										</div>
									</div>
								</div>
							</div>
);
	}	