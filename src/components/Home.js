// import axios from "axios";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import React from "react";
import EditUser from "./EditUser";
import CreateUser from './CreateUser.js';
import {FaTrash} from "react-icons/fa";

const Home = () => {
    const socket = io.connect("http://localhost:3001");
    const [posts, setPosts] = useState([{
        body: "",
        title: "",
        id: "",
    }]);

    useEffect(() => {
            handleGET();
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
        })
    }

    const handleDelete = async (post) => {
        /*   await axios.delete(process.env.REACT_APP_API + "/" + post.id);
           setPosts(posts.filter((p) => p.id !== post.id))

         */
        socket.emit('delete/user', post.id);
    }

    return (
        <body>
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
                            <td><EditUser post={post} posts={posts} socket={socket} setPosts={setPosts} className="btn btn-info btn-sm"> update</EditUser></td>
                            <td><button id={post.id} className="delete" onClick={() => handleDelete(post)}><FaTrash>
                            </FaTrash>Remove</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <EditUser posts={posts} setPosts={setPosts} socket={socket}/>
            </div>
        </body>
    );
};

export default Home;
