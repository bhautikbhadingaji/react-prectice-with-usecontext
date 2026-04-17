import { useContext, useEffect, useState } from "react"
import { PostContext } from "../context/Context";
import { NavLink } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { Navbar } from "./navbar";

export const AllPosts = () => {

    const {
        posts,
        addPost,
        handleEditPost,
        editData,
        updatePost,
        setEditData,
        removePost,
        handlePrevBtn,
        handleNextBtn,
        currentPage,
        itemsPerPage,
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
        handleSelectUser

    } = useContext(PostContext)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        if (editData) {
            setTitle(editData.title || "")
            setBody(editData.body || "")
        }
    }, [editData])

    useEffect(() => {
        if (editTitle) {
            setTitle(editTitle.title || "")
        }
    }, [editTitle])

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = { title, body, userId: 1 };
        const titleData = { title }

        if (editData) {
            updatePost(editData.id, postData)
            setEditData({})
        } if (editTitle) {
            updateTitle(editTitle.id, titleData)
            setEditTitle({})

        }
        else {

            addPost({ title, body, userId: 1 })
        }
        setTitle("")
        setBody("")
    }

    return (
        <>
<Navbar />
            <div className="min-h-screen bg-gray-900 p-5 text-white">
                <div className="flex justify-center flex-col lg:flex-row gap-8 mb-10 p-6 rounded-xl ">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md p-4">

                        <input
                            className="border border-gray-600 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            type="text"
                            placeholder="Add Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="border border-gray-600 bg-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            type="text"
                            placeholder="Add Body..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />

                        <button
                            className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
                            type="submit">
                            {editData ? "Edit" : "Add Post"}
                        </button>

                    </form>
                </div>

                <div className="flex justify-center">
                    <input className="border p-2 rounded"
                        type="text"
                        placeholder="search By Title"
                        value={filterPost}
                        onChange={(e) => setFilterPost(e.target.value)}
                    />

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2"
                        onClick={handleFilterPost}
                    >Filter</button>

                    <input className="border p-2 rounded ml-20"
                        type="text"
                        placeholder="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2"
                        onClick={handleSearchPost}
                    >search</button>
                </div>
                <div className="flex justify-center">
                    <select className="inline-flex justify-center gap-x-1.5 border p-2 rounded bg-gray-500 px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20 mt-5"
                        onChange={(e) => handleSelectUser(e)}
                    >
                        {users?.map(item =>
                            <option key={item.id} value={item.id}>{item.name} - {item.id}</option>
                        )}
                    </select>
                </div>

                <div className="grid grid-cols-3 mt-8">
                    {currentItems.map((post) => (
                        <div key={post.id} className="max-w-md mx-auto bg-green-200 shadow-lg rounded-xl p-5 mb-5">
                            <h2 className="text-xl font-bold mb-2 text-gray-800">
                                TITLE: {post.title.substring(0, 12) + ' ...'}
                                <RiEdit2Fill className="cursor-pointer inline-block ml-3"
                                    onClick={() => handleChangeTitle(post)} />
                            </h2>

                            <p className="bg-green-200 text-gray-500 px-4 py-2 rounded-lg hover:bg-green-300">
                                BODY: {post.body.substring(0, 100) + ' ...'}
                            </p>
                            <div className="text-blue-500 hover:text-blue-700">
                                <NavLink to={`/posts/${post.id}`}>
                                    Read More...
                                </NavLink>
                            </div>

                            <button
                                onClick={() => handleEditPost(post)}
                                className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded cursor-pointer mt-7">
                                EDIT
                            </button>

                            <button
                                onClick={() => removePost(post.id)}
                                className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer mt-7">
                                DELETE
                            </button>
                            <NavLink to={`/posts/${post.id}/comments`}>
                                <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-7">Comments</button>
                            </NavLink>
                        </div>
                    ))}
                </div>

                <div>
                    <select className="inline-flex justify-center gap-x-1.5 border p-2 rounded bg-white px-3 py-2 text-sm font-semibold text-black inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                        value={itemsPerPage} onChange={(e) => setitemsPerPage(e.target.value)} onClick={handleItemPerPage}>
                        <option>Select Posts Page</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
                        onClick={handlePrevBtn}>
                        Prev
                    </button>

                    <button className="ml-2 mr-2 rounded cursor-not-allowed bg-black font-bold py-1 px-2">
                        {currentPage}
                    </button>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
                        onClick={handleNextBtn}>
                        Next
                    </button>

                </div>

            </div>

        </>
    )
}