import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Modal = (props) => {
	const { store, actions } = useContext(Context);
		return(
        <div className="modal" tabIndex="-1" role="dialog" style={{display:store.open}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Are you sure?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>actions.closeModal()}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>If you delete this thing the entire universe will go down!.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={()=>actions.closeModal()}>Oh no!</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>actions.eliminateContac(store.idcontac)}>Yes baby!</button>
                </div>
                </div>
            </div>
        </div>
    );}