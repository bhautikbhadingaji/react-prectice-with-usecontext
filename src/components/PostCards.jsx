import { useContext, useState } from "react"
import { PostContext } from "../context/Context"
import { NavLink } from "react-router-dom";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import { DialogsBox } from "./DialogsBox";
import { Navbar } from "./navbar";
import { Blank } from "./Blank";

export const PostCards = () => {

    const [id, setId] = useState(null)
    const [openEdit, setOpenEdit] = useState(false)

    const {
        handleEditPost,
        removePost,
        handleChangeTitle,
        currentItems,
        showComponent,
        setShowComponent } = useContext(PostContext);

    const showDialog = async (id) => {
        setShowComponent(true)
        setId(id)
        console.log("id", id)
    }


    return (
        <>
            <div className="grid grid-cols-3 mt-8">
                {currentItems.map((post) => (

                    <div key={post.id}
                        className="max-w-md mx-auto bg-green-200 shadow-lg rounded-xl p-5 mb-5">
                        <h2
                            className="text-xl font-bold mb-2 text-gray-800 ml-4"
                            data-tooltip-id="title-tooltip"
                            data-tooltip-content={post.title}
                        >
                            TITLE: {post.title.substring(0, 12) + ' ...'}
                            <button 
                            onClick={()=>setOpenEdit(true)}>
                                <RiEdit2Fill className="cursor-pointer inline-block ml-3"
                                    onClick={() => handleChangeTitle(post)} />
                            </button>
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
                            <button 
                                onClick={() => handleEditPost(post)}
                                className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 h-10 px-4 rounded cursor-pointer mt-7 flex items-center gap-2">
                                EDIT<FiEdit />
                            </button>

                            <button
                                onClick={() => showDialog(post.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold h-10 py-2 px-4 rounded cursor-pointer mt-7 flex items-center gap-2">
                                DELETE<RiDeleteBin6Line />
                            </button>
                            <NavLink to={`/posts/${post.id}/comments`}>
                                <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold h-10 py-2 px-4 rounded cursor-pointer mt-7 flex items-center gap-2">Comments <FaRegCommentDots /></button>
                            </NavLink>
                            <DialogsBox isOpen={showComponent} setShowComponent={setShowComponent} id={id} />
                        </div>
                    </div>
                ))}
            </div>
            <Tooltip id="title-tooltip" />
        </>
    )
}