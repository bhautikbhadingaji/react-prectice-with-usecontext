import axios from "axios";


export const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const getPosts = () => {
    return api.get("/posts")
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

export const getComments = (id) => {           
    return api.get(`/posts/${id}/comments`)
}

export const getFilteredPost = (filterPost) => {
    return api.get(`/posts?title=${filterPost}`)
}

export const getsearchedPost = (searchValue) => { 
    return api.get(`/posts?title=${searchValue}`)
}

export const editTitlePost = (id, post) => { 
    return api.patch(`/posts/${id}`, post)
}

export const getUsers = () => {
    return api.get("/users")
}

export const getUsersPost = (seletedUser) => {
    return api.get(`/posts?userId=${seletedUser}`)
}