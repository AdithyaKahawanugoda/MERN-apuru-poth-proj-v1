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
   const [advertisement, setAdvertisement] = useState([])

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
            await axios.get('http://localhost:8059/advertisement/all')
            .then((res) => {
              setAdvertisement(res.data.advertisement)
            })
            .catch((err) => {
              console.log(err)
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
        <div className="row">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner pt-3 pl-3 pr-2" style={{height: 480}}>
              {console.log(advertisement.length)}
              {advertisement.length > 0 ? 
                <div class="carousel-item active">
                  <img class="d-block w-100" src={advertisement[0].image} alt="First slide"/>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>{advertisement[0].title}</h5>
                    <p>go to the product</p>
                  </div>
                </div>
              : <span>None</span>}
              {advertisement.map((item) => (
                <div class="carousel-item">
                  <img class="d-block w-100" src={item.image} alt="Slide"/>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Checkout Now</h5>
                    <p>go to the product</p>
                  </div>
                </div>
              ))}
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
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