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
import { CardDetails } from "../pages/CardDetails";
import { Drawers } from "./Drawers";
import { Form } from "./Form";

export const PostCards = () => {

    const [postId, setPostId] = useState(null)
    const [readMoreId, setReadMoreId] = useState(null)
    const [openCardDetails, setOpenCardDetails] = useState(false)

    const {
        handleEditPost,
        removePost,
        handleChangeTitle,
        currentItems,
        showComponent,
        setShowComponent,
        openForm,
        setOpenForm } = useContext(PostContext);


    const showDialog = async (id) => {
        setShowComponent(true)
        setPostId(id)
    }


    const handleDrawerOpen = (callBy, postData, post) => {

        if (callBy === "readMore") {
            setReadMoreId(postData)
        } else if (callBy === "allDataEdit") {
            setOpenForm(true)
            handleEditPost(postData)
        } else if (callBy === "EditTitle") {
            handleChangeTitle(postData)
            setOpenForm(true)
        }
        setOpenCardDetails(true)
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
                            TITLE:{post.title.length <= 12 ? post.title : post.title.substring(0, 12) + ' ...'}
                            <button>
                                <RiEdit2Fill className="cursor-pointer inline-block ml-3"
                                    onClick={() => handleDrawerOpen("EditTitle", post)} />
                            </button>
                        </h2>

                        <p className="bg-green-200 text-gray-500 px-4 py-2 rounded-lg hover:bg-green-300">
                            BODY: {post.body.substring(0, 100) + ' ...'}
                        </p>
                        <button
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                            onClick={() => { handleDrawerOpen("readMore", post.id) }}>
                            Read More...
                        </button>

                        <div className="flex items-center gap-8 mt-7">
                            <button
                                onClick={() => handleDrawerOpen("allDataEdit", post)}
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
                        </div>
                    </div>
                ))}
            </div>
            <Tooltip id="title-tooltip" />
            <DialogsBox isOpen={showComponent} setShowComponent={setShowComponent} id={postId} />
            {openCardDetails && <Drawers openCardDetails={openCardDetails} setOpenCardDetails={setOpenCardDetails} id={readMoreId} />}
        </>
    )
}