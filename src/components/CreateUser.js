import React, {useState} from "react";
import {FaPlus} from "react-icons/fa";
import Popup from "./popup";
import axios from "axios";

export default function CreateUser({ setPosts, posts }) {
    const baseURL = process.env.REACT_APP_API;
    const [buttonPopup, setButtonPopup] = useState(false);
    const [postInfo, setPostInfo] = useState({
        title: '',
        body: '',
    });

    const handlePOST = (e) => {
        e.preventDefault();
        axios.post(baseURL,
            {
                title: postInfo.title,
                body: postInfo.body,
            }
        )
            .then(response => {
                setPosts(posts.concat(response.data));
            })
    }

    const handleChange = (e) => {
        setPostInfo({...postInfo, [e.target.name] : e.target.value});
    }

    return (
        <div>
            <button id="createBtn" onClick={() => setButtonPopup(true)} id="createBtn">
                <FaPlus></FaPlus></button>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>Add a new user</h3>
                <form onSubmit={handlePOST}>
                    <input
                        className="addNewTitle"
                        name="title"
                        value={postInfo.title}
                        onChange={handleChange}
                        placeholder="Enter title...">
                    </input>
                    <br/>
                    <input
                        className="addNewBody"
                        name="body"
                        value={postInfo.body}
                        onChange={handleChange}
                        placeholder="Enter post body...">
                    </input>
                    <br/>
                    <button type='submit' id="create">Add</button>
                </form>
            </Popup>
        </div>
    )
}
