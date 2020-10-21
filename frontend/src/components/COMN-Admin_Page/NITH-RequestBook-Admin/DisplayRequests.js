import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleRequest from './SingleRequest'

const DisplayBookRequest = () => {
  const [bookRequests, setBookRequests] = useState([])
  const [filteredBookRequests,setFilteredBookRequests] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchRequest = async () => {
      await axios.get('http://localhost:8059/request/all')
      .then((res) => {
        setBookRequests(res.data.requests)
      })
      .catch((err) => {
        alert(err.message)
      })
    }
    fetchRequest()
  },[])

  useEffect(() => {
    setFilteredBookRequests(
      bookRequests.filter((feedback) => feedback.bookName.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, bookRequests])

  return (
    <div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search Requests By Book Name" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e) => setSearch(e.target.value)}/>
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">Search</span>
        </div>
      </div>
        <br/>
      {filteredBookRequests.map((item) => (
        <SingleRequest
          bookName={item.bookName}
          userName={item.userName}
          userEmail={item.userEmail}
          authorName={item.authorName}
          userImage={item.profileImage}
          printedYear={item.printedYear}
        />
      ))}
    </div>
  )
}

export default DisplayBookRequest