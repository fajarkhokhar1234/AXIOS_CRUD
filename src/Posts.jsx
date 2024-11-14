import React, { useEffect, useState } from "react";
import { DeletePost, GetPost } from '../src/api/PostApi';
import '../App.css'
import { Form } from "../src/Form";

export const Posts = () => {

    // getting posts
    const [posts, setPosts] = useState([])
    const PostData = async () => {
        const response = await GetPost()
        // console.log(response);
        setPosts(response.data);
    }
    useEffect(() => {
        PostData()
    }, [])


    // deleting posts
    const handleDeletePost = async (id) => {
        try {
            const response = await DeletePost(id)
            // console.log(response);
            if (response.status === 200) {
                const newPosts = posts.filter((curPost) => {
                    return curPost.id !== id
                })
                setPosts(newPosts)
            }
        } catch (error) {
            console.log(response.status);
        }

    }

    // form Edit button handling
    const [updateApi, setUpdateApi] = useState({})
    const handleUpdatePost = (curElem) => {
        setUpdateApi(curElem)
    }
    return (
        <>
            <section className="section-form">
                <Form posts={posts} setPosts={setPosts} updateApi={updateApi} setUpdateApi={setUpdateApi}/>
            </section>
            <section className="section-post">
                <ol>
                    {posts.map((curElem) => {
                        const { id, body, title } = curElem;
                        return (
                            <li key={id}>
                                <p>Title: {title}</p>
                                <p>Body: {body}</p>
                                <button onClick={() => handleUpdatePost(curElem)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDeletePost(id)}>Delete</button>
                            </li>
                        );
                    })}
                </ol>
            </section>
        </>
    )
}