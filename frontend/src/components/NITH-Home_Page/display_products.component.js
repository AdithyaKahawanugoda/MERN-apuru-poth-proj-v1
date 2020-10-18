import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Paginat from './pagination.component'
import Book from './book.component'
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const DisplayBooks = () => {

   const [isLoading, setLoading] = useState(true)
   const [books, setBooks] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const [postPerPage] = useState(12)

   useEffect(() => {
      setLoading(true)
      const getProducts = async () => {
         try {
            await axios.get('http://localhost:8059/inventory/product/all')
               .then((res) => {
                  setBooks(res.data.books)
                  setLoading(false)
               })
               .catch((error) => {
                  console.log(error.message)
               })
         } catch (error) {
            console.log(error.message)
         }
      }
      getProducts()
   }, [])

   const indexOfLastPost = currentPage * postPerPage
   const indexOfFirstPost = indexOfLastPost - postPerPage
   const currentPost = books.slice(indexOfFirstPost, indexOfLastPost)

   if (isLoading) {
      return <div className="d-flex justify-content-center" style={{ paddingTop: 400 }}>
         <CircularProgress />
      </div>
   }

   let paginate = (pageNumber) => {
      return setCurrentPage(pageNumber)
   }

   return (
      <div style={{ backgroundImage: 'url(https://picsum.photos/id/1073/5472/3648.jpg/?blur=10)', height: "100%" }}>
         <div className="container">
            <div className="row" style={{ paddingTop: 15 }}>
               {currentPost.map((book) => (
                  <div key={book._id} className="col-lg-3 col-md-6">
                    <div className="ui link cards">
                      <Book
                          key={book._id}
                          bookId={book._id}
                          bookTitle={book.publishingTitle}
                          bookPrice={book.marketPrice}
                          averageRating={book.averageRating}
                          bookImage={book.bookImage}
                          translator={book.translator}
                      />
                      {console.log(book.weight)}
                     </div>
                  </div>
               ))}
            </div>
            <br />
            <div className="d-flex justify-content-center customPagination">
               <Paginat
                  postPerPage={postPerPage}
                  totalPosts={books.length}
                  paginate={paginate}
               />
            </div>
         </div>
      </div>
   )
}

export default DisplayBooks