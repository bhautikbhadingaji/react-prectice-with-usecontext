import { useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"
import { PostContext } from "../context/Context";

export const CommentsPage = () => {

    const { id } = useParams();
    const { comments, fetchComments, filterComments, handleFilterComments, setFilterComments } = useContext(PostContext)

    useEffect(() => {
        if (id) {
            fetchComments(id)
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-900 text-white">

            <div className="flex justify-center items-center gap-4 mb-10">
                <input className="border p-2 rounded mt-5" 
                    type="text"
                    placeholder="search By Email..."
                    value={filterComments}
                    onChange={(e) => setFilterComments(e.target.value)}
                />

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2 mt-4.5"
                    onClick={()=>handleFilterComments(id)}
                >Filter</button>
            </div>

            <div className="flex flex-wrap gap-10 ml-24 mb-10">

                {comments.map(comment =>
                    <div key={comment.id} className="w-full bg-yellow-100 text-black block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium mt-12">

                        <p>Name: {comment.name}</p>
                        <br />
                        <p>Email: {comment.email}</p>
                        <br />
                        <p>Body: {comment.body}</p>
                    </div>
                )}

            </div>

            <div className="ml-250 mb-8 mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer fixed bottom-6 left-6">
                <NavLink
                    to="/"
                >
                    ← Back
                </NavLink>
            </div>
        </div>
    )
}