// import axios from "axios";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import React from "react";
import EditUser from "./EditUser";
import CreateUser from './CreateUser.js';
import {FaTrash} from "react-icons/fa";
import {FaServer} from "react-icons/fa";
import ServerLogs from "./ServerLogs";

const Home = () => {
    const socket = io.connect("http://localhost:3001");
    const [view, setView] = useState(false);
    const [posts, setPosts] = useState([{
        body: "",
        title: "",
        id: "",
    }]);

    useEffect(() => {
        if(!socket.connected) {
            setPosts(JSON.parse(localStorage.getItem("get")));
        }
        socket.on("connect", () => {
            handleGET();
        })
    },[]);

    const handleGET = () => {
        /* axios.get(process.env.REACT_APP_API)
             .then(response => {
                 setPosts(posts.concat(response.data));
             })
         */
        socket.emit('get/users');
        socket.on('get/users', (data) => {
            setPosts(data);

            let postsSerialized = JSON.stringify(data);
            localStorage.setItem("get", postsSerialized);
        })
    }

    const handleDelete = async (post) => {
        /*   await axios.delete(process.env.REACT_APP_API + "/" + post.id);
           setPosts(posts.filter((p) => p.id !== post.id))

         */
        socket.emit('delete/user', post.id);
    }

    const handleLogs = () => {
        setView(true);
    }

    return (
        <body>
          { view ? <ServerLogs setView={setView}/> :
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th></th>
                        <CreateUser posts={posts} setPosts={setPosts} socket={socket}/>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map(post =>
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td>
                                <EditUser
                                    post={post} posts={posts} socket={socket} setPosts={setPosts}
                                    className="updatePost"> update
                                </EditUser>
                            </td>
                            <td><button id={post.id} className="delete" onClick={() => handleDelete(post)}><FaTrash>
                            </FaTrash>Remove</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div id="logWrapper">
                    <button id="logs" onClick={handleLogs}><FaServer></FaServer></button>
                </div>
                <EditUser posts={posts} setPosts={setPosts} socket={socket}/>
            </div>
          }
        </body>
    );
};

export default Home;
