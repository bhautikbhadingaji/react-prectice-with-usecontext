import axios from "axios";


export const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const getPosts = () => {
    return api.get("/posts?_limit=4")
}

export const createPosts = (data) => {
    return api.post("/posts",data)
}

export const editPost = (id, data) => {
    return api.put(`/posts/${id}`,data)
}

export const deletePost = (id) => {
 return api.delete(`/posts/${id}`)
}