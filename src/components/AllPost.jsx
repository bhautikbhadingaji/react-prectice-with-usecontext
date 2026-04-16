import { useContext, useEffect, useState } from "react"
import { PostContext } from "../context/Context";
import { NavLink } from "react-router-dom";

export const AllPosts = () => {

    const { posts, addPost, handleEditPost, editData, updatePost, setEditData, removePost } = useContext(PostContext)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        if (editData) {
            setTitle(editData.title || "")
            setBody(editData.body || "")
        }
    }, [editData])

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = { title, body, userId: 1 };

        if (editData) {
            updatePost(editData.id, postData)
            setEditData({})
        } else {

            addPost({ title, body, userId: 1 })
        }


        setTitle("")
        setBody("")
    }

    return (
        <>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 bg-gray-800">
                <div className="flex justify-center items-top p-6 min-h screen">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md p-4">

                        <input
                            className="border p-2 rounded"
                            type="text"
                            placeholder="Add Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="border p-2 rounded"
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

                {posts.map((post) => (
                    <div key={post.id} className="max-w-md mx-auto bg-green-200 shadow-lg rounded-xl p-5 mb-5">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">
                            TITLE: {post.title.substring(0, 12) + ' ...'}
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
                    </div>
                ))}
            </div>
        </>
    )
}