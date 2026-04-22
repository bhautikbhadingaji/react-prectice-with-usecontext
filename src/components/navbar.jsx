import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { Blank } from "./Blank"
import { PostContext } from "../context/Context"

export const Navbar = () => {

const {setOpenForm, openForm, setOpenCloseDrawer} = useContext(PostContext);

const handleAddPostDrawer = () => {
    setOpenForm(true)
    setOpenCloseDrawer(true)
}


    return (
        <nav className="flex justify-between item-center bg-gray-500 text-white px-6 py-4 shadow-md sticky top-0 mt-0">
            <h2 className="text-2xl font-bold tracking-wide">MyPosts</h2>
            <ul className="flex gap-6 text-lg">
                <li className="cursor-pointer hover:text-teal-400 ">
                    <NavLink to= "/">
                        Home
                    </NavLink>
                </li>
                <button className="cursor-pointer hover:text-teal-400 "
                onClick={()=>{handleAddPostDrawer()}}>
                        Add Post
                </button>
            </ul>
        </nav>
    )
}