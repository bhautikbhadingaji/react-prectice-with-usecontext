import { useContext } from "react"
import { PostContext } from "../context/Context"

export const FilterAndSearch = () => {

    const {
        handleFilterPost,
        handleSearchPost,
        setFilterPost,
        setSearchValue,
        filterPost,
        searchValue } = useContext(PostContext);

    return (
        <>
            <div className="flex justify-center mt-5">
                <input className="border p-2 rounded"
                    type="text"
                    placeholder="search By Title"
                    value={filterPost}
                    onChange={(e) => setFilterPost(e.target.value)}
                />

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2"
                    onClick={handleFilterPost}
                >Filter</button>

                <input className="border p-2 rounded ml-20"
                    type="text"
                    placeholder="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2"
                    onClick={handleSearchPost}
                >search</button>
            </div>
        </>
    )
}