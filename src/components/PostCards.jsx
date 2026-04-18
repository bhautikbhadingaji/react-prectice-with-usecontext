import { useContext } from "react"
import { PostContext } from "../context/Context"
import { NavLink } from "react-router-dom";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";

export const PostCards = () => {

    const {
        handleEditPost,
        removePost,
        handleChangeTitle,
        currentItems } = useContext(PostContext);
    return (
        <>
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
        </>
    )
}