import { useContext } from "react";
import { NavLink, useParams } from "react-router-dom"
import { PostContext } from "../context/Context";

export const CardDetails = () => {
    const { id } = useParams()
    const { posts } = useContext(PostContext);

    console.log("type of id is", typeof (id))


    const post = posts.find((p) => p.id === Number(id));




    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-800">
            <div className="w-full text-center text-white">
                <h1 className="font-extrabold underline">Card Details {id}</h1>
                <h1 className="font-bold">TITLE : {post.title}</h1>
                <p>BODY : {post.body}</p>
            </div>
            <div className="mt-8 bg-transparent text-white hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          <NavLink
            to="/"
          >
            ← Back
          </NavLink>
        </div>
        </div>
    )
}