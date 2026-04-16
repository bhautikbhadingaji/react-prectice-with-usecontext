import { createContext, useEffect } from "react"
import { useState } from "react"
import { createPosts, deletePost, editPost, getPosts } from "../api/axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [editData, setEditData] = useState(null)


    // GET POST
    const fetchPosts = async () => {
        const res = await getPosts()
        setPosts(res.data)
    }

    // CREATE POST
    const addPost = async (data) => {
        const res = await createPosts(data)

        console.log("data", res.data)

        setPosts((prev) => [res.data, ...prev])
    }

    // UPDATE POST
    const handleEditPost = (post) => {
        setEditData(post)
    }
    const updatePost = async (id, editData) => {
        const res = await editPost(id, editData)
        setPosts((prev) =>
            prev.map((post) => (
                post.id === id ? res.data : post
            ))
        )
    }

    // DELETE POST
    const removePost = async(id) => {
        try {
           await deletePost(id)

           setPosts((prev)=> prev.filter((post)=>post.id !== id));

        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <PostContext.Provider value={{ posts, addPost, handleEditPost, updatePost, setEditData, setPosts, editData, removePost }}>
            {children}
        </PostContext.Provider>
    )
}