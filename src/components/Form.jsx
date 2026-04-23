import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../context/Context";
import toast from "react-hot-toast";
import { Users } from "./Users";

export const Form = () => {

    const { addPost, editData, updatePost, setEditData, editTitle, setEditTitle, updateTitle, setOpenForm, openCloseDrawer, setOpenCloseDrawer, users, handleSelectUser, setSelectedUser, selectUserFromForm, setSelectUserFromForm, fetchPosts } = useContext(PostContext)

    const navigate = useNavigate();


    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        if (editData) {
            setTitle(editData.title || "")
            setBody(editData.body || "")
        } else if (editTitle) {
            setTitle(editTitle.title || "")
        } else {
            setTitle("")
            setBody("")
        }
    }, [editData, editTitle])

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = { title, body, userId: selectUserFromForm };
        const titleData = { title }

        if (editData) {
            updatePost(editData.id, postData)
            setEditData(null)
            toast.success("Edit Post Successfully");
        } else if (editTitle) {
            updateTitle(editTitle.id, titleData)
            setEditTitle(null)
            toast.success("Edit Title Successfully");
        }
        else {
            addPost({ title, body, userId: selectUserFromForm })
            toast.success("Add Post Successfully");
            fetchPosts()
            setSelectedUser("All")
            setTitle("")
            setBody("")
        }
        setOpenForm(false)
        setOpenCloseDrawer(false)

    }

    const handleSelectUserFromForm = (e) => {
        setSelectUserFromForm(e.target.value)
    }


    return (
        <div>
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="flex justify-center flex-col lg:flex-row h-full mb-10 p-6 rounded-xl bg-gray-900 ">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md p-4">
                        <input
                            className="border border-gray-800 bg-gray-300 text-black caret-pink-500 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            type="text"
                            placeholder="Add Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {editTitle ? null : <textarea
                            className="border border-gray-700 bg-gray-300 text-black caret-pink-500 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            type="text"
                            placeholder="Add Body..."
                            value={body}
                            disabled={editTitle}
                            onChange={(e) => setBody(e.target.value)}
                        />}

                        {
                            editTitle ? null :
                                <select className="border border-gray-800 bg-gray-300 text-black caret-pink-500 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    onChange={(e) => handleSelectUserFromForm(e)}
                                >
                                    {users?.map(item =>
                                        <option key={item.id} value={item.id}>{item.name} - {item.id}</option>
                                    )}
                                </select>
                        }


                        <button
                            className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
                            type="submit"
                        >
                            {editData || editTitle ? "Edit" : "Add Post"}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}