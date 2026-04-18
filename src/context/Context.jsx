import { createContext, useCallback, useEffect } from "react"
import { useState } from "react"
import { createPosts, deletePost, editPost, editTitlePost, getComments, getFilteredComments, getFilteredPost, getPosts, getsearchedPost, getUsers, getUsersPost } from "../api/axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [editData, setEditData] = useState(null)
    const [comments, setComments] = useState([])
    const [itemsPerPage, setitemsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [filterPost, setFilterPost] = useState([])
    const [searchValue, setSearchValue] = useState([])
    const [editTitle, setEditTitle] = useState("")
    const [users, setUsers] = useState([])
    const [filterComments, setFilterComments] = useState("")


    // GET POST
    const fetchPosts = async () => {
        const res = await getPosts()
        setPosts(res.data)
    }

    //GET USERS
    const fetchUsers = async () => {
        const res = await getUsers()
        setUsers(res.data)
    }

    useEffect(() => {
        fetchUsers()
    },[])

    // CREATE POST
    const addPost = async (data) => {
        const res = await createPosts(data)
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

    // UPDATE ONLY TITLE
    const handleChangeTitle = async (post) => {
        setEditTitle(post)
    }
    const updateTitle = async (id, editTitle) => {
        const res = await editTitlePost(id, editTitle)
        setPosts((prev) =>
            prev.map((post) => (
                post.id === id ? res.data : post
            ))
        )
    }


    // DELETE POST
    const removePost = async (id) => {
        try {
            let confirmation = confirm("Want to delete?");
            await deletePost(id)

            setPosts((prev) => prev.filter((post) => post.id !== id));

        } catch (error) {
            console.error(error);
        }
    }

    //GET COMMENTS
    const fetchComments = async (id) => {
        const res = await getComments(id)
        setComments(res.data)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    useEffect(() => {
        fetchPosts();
    }, [])

    //PAGiNATION
    const handleItemPerPage = () => {

    }
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex - itemsPerPage;

    const currentItems = posts.slice(endIndex, startIndex);

    const totalPages = Math.ceil(posts.length / itemsPerPage);

    const handlePrevBtn = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }, [
        currentPage
    ])

    const handleNextBtn = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
        } else {
            console.log("can't go next")
        }
    }, [
        currentPage, totalPages
    ])

    //FILTER AND SEARCH

    const handleFilterPost = async () => {
        try {
            const res = await getFilteredPost(filterPost);
            setPosts(res.data);
        } catch (err) {
            console.error("Fetch posts failed", err);
        }
    };

    const handleSearchPost = async () => {
        try {
            const res = await getsearchedPost(searchValue);
            setPosts(res.data);
        } catch (err) {
            console.error("Fetch posts failed", err);
        }
    }

    //SELECT USERS
    const handleSelectUser = async(e) =>{
        const res = await getUsersPost(e.target.value)
        setPosts(res.data)
    }

    //FILTER COMMENTS

    const handleFilterComments = async(id) => {
const res = await getFilteredComments(id,filterComments)
setComments(res.data)
    }

    return (
        <PostContext.Provider value={{
            posts,
            addPost,
            handleEditPost,
            updatePost,
            setEditData,
            setPosts,
            editData,
            removePost,
            comments,
            fetchComments,
            currentPage,
            itemsPerPage,
            handleNextBtn,
            handlePrevBtn,
            setitemsPerPage,
            handleItemPerPage,
            currentItems,
            handleFilterPost,
            handleSearchPost,
            setFilterPost,
            setSearchValue,
            filterPost,
            searchValue,
            handleChangeTitle,
            setEditTitle,
            editTitle,
            updateTitle,
            users,
            handleSelectUser,
            filterComments,
            handleFilterComments,
            setFilterComments
        }}>
            {children}
        </PostContext.Provider>
    )
}