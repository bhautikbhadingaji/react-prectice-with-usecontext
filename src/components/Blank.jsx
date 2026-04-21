
import { useContext, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { PostContext } from '../context/Context'


export const Blank = ({ openEdit, setOpenEdit }) => {
    const { addPost, editData, updatePost, setEditData, editTitle, setEditTitle, updateTitle, openForm, setOpenForm} = useContext(PostContext)

    const navigate = useNavigate();


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
        toast.success("Add Post Successfully");
        
        if (editData) {
            updatePost(editData.id, postData)
            setEditData({})
            toast.success("Edit Post Successfully");
        } if (editTitle) {
            updateTitle(editTitle.id, titleData)
            setEditTitle({})
            toast.success("Edit Title Successfully");
            
        }
        else {
            
            addPost({ title, body, userId: 1 })
        }
        setTitle("")
        setBody("")
        setOpenForm(false)
        navigate("/")
    }


    return (
        <>
            <Dialog open={openForm} onClose={setOpenForm} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
                />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <DialogPanel
                                transition
                                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                            >
                                <TransitionChild>
                                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                                        <button
                                            type="button"
                                            onClick={() => setOpenForm(false)}
                                            className="relative rounded-md text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            <span className="absolute -inset-2.5" />
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon aria-hidden="true" className="size-6" />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div className="relative flex h-full flex-col overflow-y-auto bg-gray-800 py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                                    <div className="px-4 sm:px-6">
                                        <DialogTitle className="text-base font-semibold text-white">Panel title</DialogTitle>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
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

                                                    <textarea
                                                        className="border border-gray-700 bg-gray-300 text-black caret-pink-500 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                                        type="text"
                                                        placeholder="Add Body..."
                                                        value={body}
                                                        disabled={editTitle}
                                                        onChange={(e) => setBody(e.target.value)}
                                                    />

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
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}