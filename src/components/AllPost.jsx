import { Navbar } from "./navbar";
import { Pagination } from "./Pagination";
import { PostCards } from "./PostCards";
import { Users } from "./Users";
import { FilterAndSearch } from "./Filter-Search";

export const AllPosts = () => {
    return (
        <div className="min-h-screen bg-gray-900 p-5 text-white">
            <Navbar />
            <FilterAndSearch />
            <Users />
            <PostCards />
            <Pagination />
        </div>
    )
}