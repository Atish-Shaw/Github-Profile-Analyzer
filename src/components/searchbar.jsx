function SearchBar({
    username,
    setUsername,
    getUsers
}) {
    return (
        <div className="flex flex-col w-[95%] mx-auto gap-3 ">

            <label className="text-4xl m-4 text-white">Search</label>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                        getUsers();
                        }
                    }}
                    className="flex-1 px-5 py-3 rounded-xl bg-[#0E1118] border-2 border-gray-500 outline-none text-white placeholder-gray-500"
                />

                <button
                    onClick={getUsers}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#0E1118] border-2 border-gray-500 hover:bg-[#1B1F27] cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </button>
            </div>

        </div>
    );
}

export default SearchBar;