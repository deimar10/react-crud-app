import React, {useState} from 'react';
// import axios from "axios";
import Popup from "./popup";
import {FaPen} from "react-icons/fa";

function Example(props) {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [edit, setEditUser] = React.useState({
        title: "",
        body: "",
    })
    function handleChange(e) {
        setEditUser({
            ...edit,
            [e.target.name]: e.target.value
        });
    }

    function updateUser(e) {
        e.preventDefault();
       /*  const baseURL = process.env.REACT_APP_API + "/" + props.post.id
         axios.put(baseURL, edit)
             .then((response) => {
                 props.setPosts(props.posts.filter((post => post.id !== props.post.id))
                     .concat(response.data));
             })
        */
        props.socket.emit('update/user', {
            user: edit,
            id: props.post.id
        })
    };

    if(props.post)  {
        return (
            <>
                <button onClick={() => setButtonPopup(true)} id="open-popup">
                    <FaPen></FaPen>Edit</button>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h3>Edit user</h3>
                    <label htmlFor="name">Title:</label>
                    <form onSubmit={updateUser}>
                        <input type="text" className="form-control"  name="title" onChange={handleChange}
                               value={edit.title} id="name"
                               placeholder={props.post.title}></input>

                        <label htmlFor="email">Body:</label>
                        <input type="text" className="form-control" name="body" onChange={handleChange}
                               value={edit.body} id="email"
                               placeholder={props.post.body}></input>
                        <button className="update" variant="primary" type="submit">
                            Update
                        </button>
                    </form>
                </Popup>
            </>
        );
    }
}

export default Example;
