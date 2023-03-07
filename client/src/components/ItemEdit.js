import {useState, useContext} from "react"
import {UserContext} from "../context/UserContext" 


const ItemEdit = ({setEditMode, item}) =>{

    const {user, setUser} = useContext(UserContext)
    const [itemEdit, setitemEdit] = useState(item)

    function updateItem(e){
        setitemEdit({...itemEdit, [e.target.name]: e.target.value })}

function updateFetch(){
    fetch(`/items/${itemEdit.id}`, {
        method:"PATCH",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(
            {   name: itemEdit.name,
                color: itemEdit.color,
                size: itemEdit.size,
                stock: itemEdit.stock,
                designer_id: itemEdit.designer_id})})
            .then((r) => r.json()).then((r) => {console.log(r); setEditMode(false); editState()})}

function deleteFetch(){
    fetch(`/items/${item.id}`,{
        method: "DELETE",
        headers: {"Content-Type": "application/json"}})
       .then((r) => {console.log(r); deleteItem(item)})}

function deleteItem(){
   let itemsFiltered = user.items.filter((i) => i.id !== item.id)
        let userUpdated = {...user, items: itemsFiltered}
             setUser(userUpdated)
}

function editState(){
   let filtered = user.items.filter((item) => item.id !== itemEdit.id)
   let updatedUser = {...user, items: [...filtered, itemEdit]}
   setUser(updatedUser)}

    return(
        <div key={itemEdit.id} className="item-edit-container">
            <input name="name" value={itemEdit.name} className="edit-input" placeholder="Coat" onChange={updateItem}/>
            <input name="color" value={itemEdit.color} className="edit-input" placeholder="Color" onChange={updateItem}/>
            <input name="size" value={itemEdit.size} className="edit-input" placeholder="Size" onChange={updateItem}/>
            <input name="stock" value={itemEdit.stock} className="edit-input" placeholder="Stock" onChange={updateItem}/>
            <div className="s-e-d-buttons-container">
                <button className="s-e-d-buttons" onClick={() => {updateFetch()}}>save</button>
                <button className="s-e-d-buttons" onClick={() => deleteFetch()}>delete</button>
                <button className="s-e-d-buttons" onClick={() => setEditMode(false)}>cancel</button>
            </div>
    </div>

    )
}

export default ItemEdit