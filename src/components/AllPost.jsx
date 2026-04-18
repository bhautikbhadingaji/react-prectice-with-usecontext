import { useContext, useEffect, useState } from "react"
import { PostContext } from "../context/Context";
import { NavLink } from "react-router-dom";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { Navbar } from "./navbar";

export const AllPosts = () => {

    const {
        posts,
        handleEditPost,
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
        users,
        handleSelectUser
    } = useContext(PostContext)


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 p-5 text-white">


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
                    <select className="inline-flex justify-center gap-x-1.5 border p-2 rounded bg-gray-500 text-black px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20 mt-5"
                        onChange={(e) => handleSelectUser(e)}
                    >
                        <option value="">select users</option>
                        {users?.map(item =>
                            <option key={item.id} value={item.id}>{item.name} - {item.id}</option>
                        )}
                    </select>
                </div>

                <div className="grid grid-cols-3 mt-8">
                    {currentItems.map((post) => (
                        <div key={post.id} className="max-w-md mx-auto bg-green-200 shadow-lg rounded-xl p-5 mb-5">
                            <h2 className="text-xl font-bold mb-2 text-gray-800 ml-4">
                                 TITLE: {post.title.substring(0, 12) + ' ...'}
                                <NavLink to="/add-post">
                                    <RiEdit2Fill className="cursor-pointer inline-block ml-3"
                                        onClick={() => handleChangeTitle(post)} />
                                </NavLink>
                            </h2>

                            <p className="bg-green-200 text-gray-500 px-4 py-2 rounded-lg hover:bg-green-300">
                                BODY: {post.body.substring(0, 100) + ' ...'}
                            </p>
                            <div className="text-blue-500 hover:text-blue-700">
                                <NavLink to={`/posts/${post.id}`}>
                                    Read More...
                                </NavLink>
                            </div>

                            <div className="flex items-center gap-8 mt-7">
                                <NavLink to="/add-post"
                                    onClick={() => handleEditPost(post)}
                                    className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 h-10 px-4 rounded cursor-pointer mt-7 flex items-center gap-2">
                                    EDIT<FiEdit />
                                </NavLink>

                                <button
                                    onClick={() => removePost(post.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold h-10 py-2 px-4 rounded cursor-pointer mt-7 flex items-center gap-2">
                                    DELETE<RiDeleteBin6Line />
                                </button>
                                <NavLink to={`/posts/${post.id}/comments`}>
                                    <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold h-10 py-2 px-4 rounded cursor-pointer mt-7 flex items-center gap-2">Comments <FaRegCommentDots /></button>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center space-x-4 my-6 font-sans sticky bottom-0 bg-gray-500">
                    <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 shadow-sm outline-none cursor-pointer"
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
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                        onClick={handlePrevBtn}>
                        ⬅️Prev
                    </button>

                    <button className="bg-transparent hover:bg-gray-700 text-white font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                        {currentPage}
                    </button>

                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                        onClick={handleNextBtn}>
                        Next➡️
                    </button>

                </div>

            </div>

        </>
    )
}