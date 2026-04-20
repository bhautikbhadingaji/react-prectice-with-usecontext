import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Blank } from "./Blank"

export const Navbar = () => {

const [openForm1, setOpenForm1] =  useState(false)

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
                onClick={()=>setOpenForm1(true)}>
                    {/* <NavLink to="/add-post"> */}
                        Add Post
                    {/* </NavLink> */}
                </button>
            </ul>
            <Blank openForm1 ={openForm1} setOpenForm1={setOpenForm1}/>
        </nav>
    )
}