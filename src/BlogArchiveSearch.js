import React, { useState, useEffect } from 'react';

const BlogArchiveSearch = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [posts, setPosts] = useState([]);
   const [filteredPosts, setFilteredPosts] = useState([]);

   useEffect(() => {
      fetchPosts();
   }, []);

   const fetchPosts = async () => {
      try {
         const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
         const data = await response.json();
         setPosts(data);
      } catch (error) {
         console.error(error);
      }
   };

   const handleSearch = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
   };

   const handleFilter = (e) => {
      const filterValue = e.target.value;
      let sortedPosts = [...filteredPosts];

      if (filterValue === 'asc') {
         sortedPosts.sort((a, b) => a.title.length - b.title.length);
      } else if (filterValue === 'desc') {
         sortedPosts.sort((a, b) => b.title.length - a.title.length);
      }

      setFilteredPosts(sortedPosts);
   };

   useEffect(() => {
      const filtered = posts.filter((post) =>
         post.title.toLowerCase().includes(searchTerm)
      );
      setFilteredPosts(filtered);
   }, [searchTerm, posts]);

   return (
      <div className="blog-archive-search">
         <div id="header" className="bg-sky-400 dark:bg-sky-500">
            <h1 className="dark:text-orange-100">The Blog Archive</h1>
         </div>

         <div id="content" className='bg-orange-50 dark:bg-black'>
            <div className="filter-container">
               <label htmlFor="orderFilter" className='dark:text-white'>Sort Order:</label>
               <select className="dark:bg-gray-400" id="orderFilter" onChange={handleFilter}>
                  <option value="asc">Shortest to Longest</option>
                  <option value="desc">Longest to Shortest</option>
               </select>
            </div>

            <input
               type="text"
               id="searchInput"
               placeholder="Search"
               className='dark:bg-slate-700 dark:text-white '
               value={searchTerm}
               onChange={handleSearch}
            />

            <ul id="results">
               {filteredPosts.length === 0 ? (
                  <li>No results found.</li>
               ) : (
                  filteredPosts.map((post) => (
                     <li key={post.id}>
                        <a href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}>
                           {post.title}
                        </a>
                        <p>
                           Blog ID: {post.id} | User ID: {post.userId}
                           <br />
                           {post.body}
                        </p>
                     </li>
                  ))
               )}
            </ul>
         </div>
      </div>
   );
};

export default BlogArchiveSearch;