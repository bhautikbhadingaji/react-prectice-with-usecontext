import { useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"
import { PostContext } from "../context/Context";

export const CommentsPage = () => {

    const { id } = useParams();
    const { comments, fetchComments } = useContext(PostContext)

    useEffect(() => {
        if (id) {
            fetchComments(id)
        }
    }, [id]);

    console.log("[id]", id)
    console.log("[comments]", comments)

    return (

        <div className="w-full h-screen bg-gray-800">
            <div className="flex flex-wrap gap-10 ml-24 mb-10">

                {comments.map(comment =>
                    <div key={comment.id} className="w-full bg-yellow-100 text-black block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">

                        <p>Name: {comment.name}</p>
                        <br />
                        <p>Email: {comment.email}</p>
                        <br />
                        <p>Body: {comment.body}</p>
                    </div>
                )}

            </div>

            <div className="ml-220 mb-8 mr-3 fixed bottom-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                <NavLink
                    to="/"
                >
                    ← Back
                </NavLink>
            </div>
        </div>
    )
}