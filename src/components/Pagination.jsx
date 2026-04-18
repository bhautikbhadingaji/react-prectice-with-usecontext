import { useContext } from "react"
import { PostContext } from "../context/Context"

export const Pagination = () => {

    const {
        itemsPerPage,
        setitemsPerPage,
        handleItemPerPage,
        currentItems,
        handlePrevBtn,
        handleNextBtn,
        currentPage } = useContext(PostContext);

    return (
        <>
            <div className="flex items-center justify-center space-x-4 my-6 font-sans sticky bottom-0 bg-gray-500">
                <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 shadow-sm outline-none cursor-pointer"
                    value={itemsPerPage} onChange={(e) => setitemsPerPage(e.target.value)} onClick={handleItemPerPage}>
                    <option>Select Posts Page</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </select>

                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    onClick={handlePrevBtn}>
                    ⬅️Prev
                </button>

                <button className="bg-transparent hover:bg-gray-700 text-white font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                    {currentPage}
                </button>

                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    onClick={handleNextBtn}>
                    Next➡️
                </button>

            </div>
        </>
    )
}