import React, { useRef, useState } from 'react'
import { motion } from "framer-motion";
import "./home.scss"
import Card from '../../components/card/Card'
import jsondata from "../../profiles.json"
import logo from "../../assets/logo.png"




const Home = () => {
  const data = jsondata;
  const [searchItems, setSearchItems] = useState("");

  const filteredItems = data.filter(
    (item) =>
      searchItems === "" ||
      item.first_name.toLowerCase().includes(searchItems.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchItems.toLowerCase()) ||
      item.username.toLowerCase().includes(searchItems.toLowerCase()) ||
      item.email.toLowerCase().includes(searchItems.toLowerCase())
  )
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [sortOption, setSortOption] = useState('filter');

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOption === 'followers') {
      return b.followers - a.followers;
    }
    else if (sortOption === 'filter') {
      return;
    }
    else {
      return a.username.localeCompare(b.username);
    }
  });
  const currentItems = sortedItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const topRef = useRef(null); // Create a ref

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    topRef.current.scrollIntoView({ behavior: 'smooth' });

  };

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };


  const maxDisplayPages = 4; // Change this value to adjust the number of displayed pages
  const displayPages = [];

  for (let i = currentPage - maxDisplayPages; i <= currentPage + maxDisplayPages; i++) {
    if (i >= 1 && i <= totalPages) {
      displayPages.push(i);
    }
  }



  return (
    <div className='main'>
      <div className='navbar' ref={topRef}>
        <div className='navbar-logo'>
          <img src={logo} alt="" />
        </div>
        <div className='navbar-input'>
          <input type="text" id='search' placeholder='    search..' onChange={(e) => { setSearchItems(e.target.value) }} />
          &nbsp;  
          <button >search</button>
        </div>
        <div className='navbar-filter'>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="filter"> &nbsp; &nbsp;filter</option>
            <option value="followers">Sort by Followers</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>


      <div className='container'>
        <div className='wrapper'>

          {currentItems.map((items, index) => (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              key={index}
              className='motion-div'
            >

              <Card
                username={items?.username}
                email={items?.email}
                name={items.first_name + " " + items.last_name}
                followers={items?.followers}
                location={items?.location}
                img={items?.profile_picture}
                bio={items?.bio.substring(0, 55)}
              />
            </motion.div>
          ))}

        </div>

      </div>

      <div className='pagination'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          back
        </button>

        {/* Render page numbers as buttons */}
        {displayPages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          next
        </button>
      </div>
    </div>
  )
}

export default Home