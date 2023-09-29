const fakeApiListContact = "https://playground.4geeks.com/apis/fake/contact/"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts:[],
			agenda:"holito",
			open:"none",
			idcontac:null
		},
		actions: {
			
			// Use getActions to call a function within a fuction
			getDataContac: async() => {
				const {agenda} =getStore();
				
				try{
					const resp = await fetch(fakeApiListContact+ "agenda/"+agenda, {
						method:"GET",
						headers:{"Content-Type": "application/json"}
					});
					if (resp.ok) {
						const contacts = await resp.json();
						setStore({contacts});
						console.log (contacts);
						
					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}
					
				}catch (error){
					console.error({error})
					return
				}
				
			},

			addContac: (data)=>{
				console.log("desde store recibi datos", data)
				const {contacts} = getStore();
				const {agenda}=getStore();
				data["agenda_slug"]= agenda;
				console.log(data);
				setStore({ contacts: [...contacts,data] });
				const {uploadcontac}=getActions();
				uploadcontac(data);
				
			},
			uploadcontac: async(data) => {
				try{
					const resp = await fetch(fakeApiListContact, {
						method:"POST",
						body: JSON.stringify(data),
						headers:{"Content-Type": "application/json",},
					});
					if (resp.ok) {
						console.log ("realizado");
						const {getDataContac}=getActions();
						getDataContac();
					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}
					
				}catch (error){
					console.error({error})
					return
				}
				

			},
			editorcontac:(id,data)=>{
				console.log("estamos editando", data);
				console.log(id);
				const{agenda}=getStore();
				data["agenda_slug"]= agenda;
				const{updateserver}=getActions();
				updateserver(data, id);
				

			},updateserver:async(data, id) => {
				try{
					const resp = await fetch(fakeApiListContact+id, {
						method:"PUT",
						body: JSON.stringify(data),
						headers:{"Content-Type": "application/json",},
					});
					if (resp.ok) {
						console.log ("realizado");
						const {getDataContac}=getActions();
						getDataContac();
						
					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}
					
				}catch (error){
					console.error({error})
					return
				}},
				setContactToDelete:(id)=>{
					setStore({idcontac:id});
					const {openModal}= getActions();
					openModal();
				},
				openModal:()=>{
									
					setStore({open: "flex"})
				},
				closeModal:()=>{
					setStore({open:"none"});
				},
				eliminateContac:(idDelete)=>{
					const {contacts}=getStore();
					const dataDelete =contacts.find((item)=>item.id==idDelete);
					console.log (dataDelete);
					const {deleteContact}=getActions();
					deleteContact(idDelete);
					const {closeModal}=getActions();
					closeModal();
				},
				deleteContact:async(id) => {
					try{
						const resp = await fetch(fakeApiListContact+id, {
							method:"DELETE",
							headers:{"Content-Type": "application/json"}
						});
						if (resp.ok) {
							console.log ("realizado");
							const {getDataContac}=getActions();
							getDataContac();
							
						} else {
							console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
						}
						
					}catch (error){
						console.error({error})
						return
					}},


			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
