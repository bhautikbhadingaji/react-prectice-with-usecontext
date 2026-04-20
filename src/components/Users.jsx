import { useContext } from "react"
import { PostContext } from "../context/Context"

export const Users = () => {

    const { users, handleSelectUser } = useContext(PostContext);

    return (
        <>
            <div className="flex justify-center">
                <select className="inline-flex justify-center gap-x-1.5 border p-2 rounded bg-gray-500 text-black px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20 mt-5"
                    onChange={(e) => handleSelectUser(e)}
                >
                    {users?.map(item =>
                        <option key={item.id} value={item.id}>{item.name} - {item.id}</option>
                    )}
                </select>
            </div>
        </>
    )
}