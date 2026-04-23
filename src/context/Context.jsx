import { createContext, useCallback, useEffect } from "react"
import { useState } from "react"
import { createPosts, deletePost, editPost, editTitlePost, getComments, getFilteredComments, getFilteredPost, getPosts, getsearchedPost, getUsers, getUsersPost } from "../api/axios";
import toast from "react-hot-toast";

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

    const [seletedUser, setSelectedUser] = useState(0)
    const [selectUserFromForm, setSelectUserFromForm] = useState(1)

    const [filterComments, setFilterComments] = useState("")

    const [showComponent, setShowComponent] = useState(false);
    const [open, setOpen] = useState(true)

    const [openForm, setOpenForm] = useState(false)

    const [openCloseDrawer, setOpenCloseDrawer] = useState(false)


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

    const removePost = async (id) => {
        try {
            // setShowComponent(true);
            await deletePost(id)
            setPosts((prev) => prev.filter((post) => post.id !== id));
            setShowComponent(false);
            toast.success("Post Delete Successfully")

        } catch (error) {
            toast.error("somthing went wronge")
        }
    }

    //GET COMMENTS
    const fetchComments = async (id) => {
        const res = await getComments(id)
        setComments(res.data)
    }

    useEffect(() => {
        fetchPosts();
        fetchUsers();
        fetchComments();
    }, [setSelectedUser])

    //PAGiNATION
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex - itemsPerPage;

    let currentItems = posts.slice(0, itemsPerPage)
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    currentItems = posts.slice(endIndex, startIndex);

    useEffect(() => {
        if (seletedUser !== "All") {
            setitemsPerPage(10)
        }
    }, [seletedUser])


    //FILTER AND SEARCH

    const handleFilterPost = async () => {
        try {
            const res = await getFilteredPost(filterPost);
            setPosts(res.data);
        } catch (err) {
            toast.error("filter post faild")
        }
    };

    const handleSearchPost = async () => {
        try {
            const res = await getsearchedPost(searchValue);
            setPosts(res.data);
        } catch (error) {
            toast.error("Fetch posts failed")
        }
    }

    //SELECT USERS
    const handleSelectUser = async (value) => {
        if (value === "All") {
            const res = await getPosts()
            setPosts(res.data)
        }
        else {
            const res = await getUsersPost(value)
            setPosts(res.data)
            setitemsPerPage(currentItems.length)
        }
        setSelectedUser(value)
    }

    // ITEM-PER=PAGE
    const handleItemPerPage = (e) => {
        setitemsPerPage(e.target.value)
    }

    //FILTER COMMENTS

    const handleFilterComments = async (id) => {
        const res = await getFilteredComments(id, filterComments)
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
            setCurrentPage,
            itemsPerPage,
            setitemsPerPage,
            currentItems,
            totalPages,
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
            setFilterComments,
            showComponent,
            setShowComponent,
            open,
            setOpen,
            openForm,
            setOpenForm,
            openCloseDrawer,
            setOpenCloseDrawer,
            setSelectedUser,
            selectUserFromForm,
            setSelectUserFromForm,
            fetchPosts,
            seletedUser,
            handleItemPerPage

        }}>
            {children}
        </PostContext.Provider>
    )
}