import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import Search icon
import ProfileHeader from "./ProfileHeader";

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Toggle search visibility for small screens
  const navigate = useNavigate();
  const searchRef = useRef(null); // Create a reference for the search input container

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev); // Toggle the search input and button visibility
  };

  // Close the search input if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false); // Close search input if clicked outside
      }
    };

    if (isSearchVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up the event listener
    };
  }, [isSearchVisible]);

  return (
    <div className="w-full dark:bg-slate-800 z-10 flex items-center justify-between p-4 md:p-5 relative -top-2 ">
      {/* Small screen: Logo and Brand */}
      <div className="md:hidden flex items-center space-x-4">
        <span className="text-xl font-bold dark:text-white">ninElabs</span>
      </div>

      {/* Search and Profile Section */}
      <div className="flex items-center space-x-4 w-full justify-between">
        {/* Larger Screen: Profile and Search */}
        <div className="hidden md:flex items-center space-x-4 w-full">
          <input
            type="text"
            placeholder="Search for books..."
            className="p-2 pr-96 dark:text-gray-800 text-xl rounded-md border border-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="p-2 border justify-center text-xl bg-white dark:bg-slate-800 text-center rounded-md pl-5 pr-5"
            onClick={handleSearch}
          >
            Search
          </button>
          <div className='pl-60'>
            <ProfileHeader />
          </div>
        </div>

        {/* Small Screen: Search Icon and Toggle */}
        <div className="md:hidden flex items-center justify-end w-full" ref={searchRef}>
          {!isSearchVisible && (
            <div className="flex items-center space-x-4">
              {/* Search icon for smaller screens */}
              <FaSearch
                className="text-2xl dark:text-white cursor-pointer"
                onClick={toggleSearchVisibility}
              />
              {/* ProfileHeader visible when search input is hidden */}
              <ProfileHeader />
            </div>
          )}

          {/* Small Screen: Show input field when search icon is clicked */}
          {isSearchVisible && (
            <div className="flex items-center space-x-2 w-full">
              <input
                type="text"
                placeholder="Search for books..."
                className="p-2 w-full dark:text-gray-800 text-xl rounded-md border border-black"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="p-2 text-xl bg-white dark:bg-slate-800 rounded-md"
                onClick={handleSearch}
              >
                <FaSearch className="text-xl" /> {/* Search icon as button */}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
